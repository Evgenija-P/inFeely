import { Colors } from 'constants/Colors'
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { PanResponder, StyleSheet, View, ViewProps } from 'react-native'
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg'

type CircularTimerProps = ViewProps & {
	size?: number
	strokeWidth?: number
	maxMinutes?: number // максимальний час, за замовчуванням 60
	initialMinutes?: number // стартове значення до натискання Start
	onChangeMinutes?: (m: number) => void // коли користувач обирає повзунком
	onTick?: (remainingMs: number) => void // кожен кадр під час відліку
	onComplete?: () => void
}

export type CircularTimerRef = {
	start: () => void
	pause: () => void
	reset: () => void
	setMinutes: (m: number) => void
}

const clamp360 = (deg: number) => Math.max(0, Math.min(deg, 359.999)) // 360 в Path не малюється

const toRadians = (deg: number) => (deg - 90) * (Math.PI / 180)

const msToTime = (ms: number) => {
	const total = Math.max(0, Math.floor(ms / 1000))
	const mm = Math.floor(total / 60)
	const ss = total % 60
	return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

const CircularTimer = forwardRef<CircularTimerRef, CircularTimerProps>(function CircularTimer(
	{
		size = 300,
		strokeWidth = 20,
		maxMinutes = 60,
		initialMinutes = 0,
		onChangeMinutes,
		onTick,
		onComplete,
		style,
		...rest
	},
	ref
) {
	const radius = (size - strokeWidth) / 2
	const center = size / 2

	// ---- КОНФІГ (цільовий час), який задаємо повзунком ----
	const [targetAngle, setTargetAngle] = useState(() =>
		clamp360((initialMinutes / maxMinutes) * 360)
	)
	const targetMs = useMemo(
		() => Math.round((targetAngle / 360) * maxMinutes) * 60_000,
		[targetAngle, maxMinutes]
	)

	// ---- СТАН ВІДЛІКУ ----
	const [isRunning, setIsRunning] = useState(false)
	const [elapsedMs, setElapsedMs] = useState(0)
	const startTsRef = useRef<number | null>(null)
	const rafRef = useRef<number | null>(null)

	const remainingMs = Math.max(0, targetMs - elapsedMs)
	const progress = targetMs > 0 ? Math.min(1, elapsedMs / targetMs) : 0
	const progressAngle = clamp360(progress * 360)

	// ----- ТІКЕР (requestAnimationFrame) -----
	useEffect(() => {
		if (!isRunning) return
		const tick = (ts: number) => {
			if (startTsRef.current == null) startTsRef.current = ts - elapsedMs
			const nextElapsed = ts - startTsRef.current
			const capped = Math.min(nextElapsed, targetMs)
			setElapsedMs(capped)
			if (onTick) onTick(targetMs - capped)

			if (capped >= targetMs) {
				// фініш
				setIsRunning(false)
				startTsRef.current = null
				rafRef.current = null
				onComplete && onComplete()
				return
			}
			rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
	}, [isRunning, targetMs]) // якщо змінити target під час бігу — краще стопнути перед цим

	// Якщо користувач змінює ціль (повзунок), скидаємо відлік (і без миготіння)
	useEffect(() => {
		if (!isRunning) {
			setElapsedMs(0)
			startTsRef.current = null
		}
	}, [targetMs, isRunning])

	// ----- ЖЕСТ ДЛЯ ПОВЗУНКА (активний лише коли НЕ біжить) -----
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => !isRunning,
			onMoveShouldSetPanResponder: () => !isRunning,
			onPanResponderMove: evt => {
				if (isRunning) return
				const { locationX, locationY } = evt.nativeEvent
				const dx = locationX - center
				const dy = locationY - center
				const distance = Math.sqrt(dx * dx + dy * dy)

				// рухаємо, якщо доторк близький до кільця
				if (Math.abs(distance - radius) <= strokeWidth * 1.1) {
					let ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90
					if (ang < 0) ang += 360
					ang = clamp360(ang)
					setTargetAngle(ang)
					onChangeMinutes && onChangeMinutes(Math.round((ang / 360) * maxMinutes))
				}
			}
		})
	).current

	// ----- Геометрія -----
	const polar = (deg: number) => {
		const a = toRadians(deg)
		return { x: center + radius * Math.cos(a), y: center + radius * Math.sin(a) }
	}

	// Малюємо дугу від 0° (12 година) до endDeg, розбиваючи >180° на 2 частини
	const renderArc = (endDeg: number, color: string) => {
		const end = clamp360(endDeg)
		if (end <= 0) return null

		const segs: number[] = end > 180 ? [180, end] : [end]
		let start = 0
		return segs.map((e, i) => {
			const s = polar(start)
			const t = polar(e)
			const largeArc = e - start > 180 ? 1 : 0
			const d = `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${t.x} ${t.y}`
			start = e
			return (
				<Path
					key={`${color}-${i}-${e}`}
					d={d}
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					fill='none'
				/>
			)
		})
	}

	// Позиції маркерів
	const markerFor = (deg: number) => polar(deg)
	const targetMarker = markerFor(targetAngle)
	const runningMarker = markerFor(progressAngle)

	// ----- Імперативні методи -----
	useImperativeHandle(ref, () => ({
		start() {
			if (targetMs <= 0) return
			if (elapsedMs >= targetMs) setElapsedMs(0)
			setIsRunning(true)
		},
		pause() {
			setIsRunning(false)
			startTsRef.current = null
		},
		reset() {
			setIsRunning(false)
			setElapsedMs(0)
			startTsRef.current = null
		},
		setMinutes(m: number) {
			const ang = clamp360((Math.max(0, Math.min(m, maxMinutes)) / maxMinutes) * 360)
			setIsRunning(false)
			setElapsedMs(0)
			startTsRef.current = null
			setTargetAngle(ang)
			onChangeMinutes && onChangeMinutes(Math.round((ang / 360) * maxMinutes))
		}
	}))

	return (
		<View style={[styles.container, style]} {...rest}>
			<Svg width={size} height={size}>
				{/* Фон кільця (вся окружність) */}
				<Circle
					cx={center}
					cy={center}
					r={radius}
					stroke='#E6E6E6'
					strokeWidth={strokeWidth}
					fill='none'
				/>

				{/* Пройдений час (зелений) */}
				{renderArc(progressAngle, Colors?.light?.accent ?? '#22C55E')}

				{/* Маркер: коли НЕ біжить — показує обрану точку (ціль),
            коли біжить — показує поточний прогрес */}
				<Circle
					cx={(isRunning ? runningMarker : targetMarker).x}
					cy={(isRunning ? runningMarker : targetMarker).y}
					r={strokeWidth / 2}
					fill={Colors?.light?.accent ?? '#22C55E'}
				/>

				{/* Центр: залишок часу */}
				<SvgText
					x={center}
					y={center + 6}
					fontSize={24}
					fontWeight='600'
					textAnchor='middle'
					fill='#111'
				>
					{msToTime(remainingMs)}
				</SvgText>
			</Svg>

			{/* Прозорий шар для жестів */}
			{!isRunning && (
				<View
					style={[StyleSheet.absoluteFillObject, { width: size, height: size }]}
					{...panResponder.panHandlers}
				/>
			)}
		</View>
	)
})

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center' }
})

export default CircularTimer
