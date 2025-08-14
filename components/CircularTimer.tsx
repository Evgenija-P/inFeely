// import { useEffect, useRef, useState } from 'react'
// import {
// 	Alert,
// 	Dimensions,
// 	PanResponder,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View
// } from 'react-native'
// import Svg, { Circle, G, Path } from 'react-native-svg'
// // Розмір таймера залежить від ширини екрана
// const { width } = Dimensions.get('window')
// const SIZE = width * 0.8
// const STROKE_WIDTH = 15
// const RADIUS = (SIZE - STROKE_WIDTH) / 2
// const CENTER = SIZE / 2
// // Максимальний час таймера у хвилинах
// const MAX_MINUTES = 60
// // Хелпер функція для перетворення полярних координат у декартові
// const polarToCartesian = angle => {
// 	const a = ((angle - 90) * Math.PI) / 180.0
// 	return {
// 		x: CENTER + RADIUS * Math.cos(a),
// 		y: CENTER + RADIUS * Math.sin(a)
// 	}
// }
// // Хелпер функція для опису дуги
// const describeArc = (startAngle, endAngle) => {
// 	// Початкова точка завжди "зверху"
// 	const start = polarToCartesian(startAngle)
// 	const end = polarToCartesian(endAngle)
// 	// Прапор для малювання великої дуги
// 	const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
// 	return [
// 		`M ${start.x} ${start.y}`,
// 		`A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
// 	].join(' ')
// }
// const CircularTimer = () => {
// 	// Стан для відстеження часу
// 	const [minutes, setMinutes] = useState(0)
// 	const [elapsed, setElapsed] = useState(0)
// 	const [isRunning, setIsRunning] = useState(false)
// 	// Стан для відстеження кута маркера, щоб викликати рендеринг
// 	const [dragAngle, setDragAngle] = useState(0)
// 	// PanResponder для перетягування маркера
// 	const panResponder = useRef(
// 		PanResponder.create({
// 			onStartShouldSetPanResponder: () => !isRunning,
// 			onMoveShouldSetPanResponder: () => !isRunning,
// 			onPanResponderMove: (e, gesture) => {
// 				if (isRunning) return
// 				// Отримання координат дотику відносно центру кола
// 				const dx = gesture.moveX - e.nativeEvent.pageX + (e.nativeEvent.locationX - CENTER)
// 				const dy = gesture.moveY - e.nativeEvent.pageY + (e.nativeEvent.locationY - CENTER)
// 				// Розрахунок кута на основі координат
// 				let angle = Math.atan2(dy, dx) * (180 / Math.PI)
// 				if (angle < 0) angle += 360
// 				setDragAngle(angle)
// 				// Розрахунок хвилин на основі кута
// 				const m = Math.round((angle / 360) * MAX_MINUTES)
// 				setMinutes(m)
// 			}
// 		})
// 	).current
// 	// Таймер зворотного відліку
// 	useEffect(() => {
// 		let interval
// 		if (isRunning && elapsed < minutes * 60) {
// 			interval = setInterval(() => {
// 				setElapsed(prevElapsed => prevElapsed + 1)
// 			}, 1000)
// 		} else if (elapsed >= minutes * 60 && minutes > 0) {
// 			// Зупиняємо таймер, коли час вичерпано
// 			setIsRunning(false)
// 			// Можна додати сповіщення або вібрацію
// 			Alert.alert('Таймер завершено!')
// 		}
// 		return () => clearInterval(interval)
// 	}, [isRunning, elapsed, minutes])
// 	// Оновлення кута маркера під час відліку
// 	useEffect(() => {
// 		if (isRunning) {
// 			const remainingTime = Math.max(0, minutes * 60 - elapsed)
// 			const newAngle = (remainingTime / (minutes * 60)) * 360
// 			setDragAngle(newAngle)
// 		}
// 	}, [elapsed, isRunning, minutes])
// 	// Форматування часу
// 	const remaining = Math.max(0, minutes * 60 - elapsed)
// 	const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
// 	const ss = String(remaining % 60).padStart(2, '0')
// 	const formattedTime = `${mm}:${ss}`
// 	// Точка маркера на колі
// 	const markerPos = polarToCartesian(dragAngle)
// 	// Прогрес заповнення кола
// 	const progressArc = describeArc(0, dragAngle)
// 	// Обробники кнопок
// 	const handleStartPause = () => {
// 		if (minutes > 0) {
// 			setIsRunning(!isRunning)
// 		}
// 	}
// 	const handleReset = () => {
// 		setIsRunning(false)
// 		setElapsed(0)
// 		setMinutes(0)
// 		setDragAngle(0)
// 	}
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.svgWrapper}>
// 				<Svg height={SIZE} width={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
// 					{/* Фон кола */}
// 					<Circle
// 						cx={CENTER}
// 						cy={CENTER}
// 						r={RADIUS}
// 						stroke='#e0e0e0'
// 						strokeWidth={STROKE_WIDTH}
// 						fill='none'
// 					/>
// 					{/* Прогрес дуги */}
// 					<Path
// 						d={progressArc}
// 						stroke='#6C63FF'
// 						strokeWidth={STROKE_WIDTH}
// 						fill='none'
// 						strokeLinecap='round'
// 					/>
// 					{/* Маркер, що рухається */}
// 					<G {...panResponder.panHandlers}>
// 						<Circle
// 							cx={markerPos.x}
// 							cy={markerPos.y}
// 							r={STROKE_WIDTH + 5} // Збільшений розмір для зручності дотику
// 							fill='#6C63FF'
// 						/>
// 					</G>
// 				</Svg>
// 				<View style={styles.timeContainer}>
// 					<Text style={styles.timeText}>
// 						{isRunning ? formattedTime : `${minutes} min`}
// 					</Text>
// 				</View>
// 			</View>
// 			<View style={styles.buttonRow}>
// 				<TouchableOpacity style={styles.button} onPress={handleStartPause}>
// 					<Text style={styles.buttonText}>{isRunning ? 'Пауза' : 'Старт'}</Text>
// 				</TouchableOpacity>
// 				<TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
// 					<Text style={styles.buttonText}>Скинути</Text>
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	)
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff',
// 		padding: 20
// 	},
// 	svgWrapper: {
// 		width: SIZE,
// 		height: SIZE,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		position: 'relative'
// 	},
// 	timeContainer: {
// 		position: 'absolute',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0
// 	},
// 	timeText: {
// 		fontSize: 48,
// 		fontWeight: '300',
// 		color: '#333'
// 	},
// 	buttonRow: {
// 		flexDirection: 'row',
// 		marginTop: 40,
// 		gap: 20
// 	},
// 	button: {
// 		backgroundColor: '#6C63FF',
// 		paddingHorizontal: 30,
// 		paddingVertical: 15,
// 		borderRadius: 50,
// 		elevation: 5,
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.25,
// 		shadowRadius: 3.84
// 	},
// 	resetButton: {
// 		backgroundColor: '#999'
// 	},
// 	buttonText: {
// 		color: '#fff',
// 		fontWeight: '600',
// 		fontSize: 16
// 	}
// })
// export default CircularTimer
import React, { useRef, useState } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

const CircularTimer = ({ size = 300, strokeWidth = 20 }) => {
	const radius = (size - strokeWidth) / 2
	const center = size / 2
	const circumference = 2 * Math.PI * radius

	const [progress, setProgress] = useState(0) // 0..1
	const [angle, setAngle] = useState(0)

	const polarToCartesian = (angleDeg: number) => {
		const a = ((angleDeg - 90) * Math.PI) / 180
		return {
			x: center + radius * Math.cos(a),
			y: center + radius * Math.sin(a)
		}
	}

	const describeArc = (endAngle: number) => {
		const start = polarToCartesian(0)
		const end = polarToCartesian(endAngle)
		const largeArcFlag = endAngle > 180 ? 1 : 0
		return [
			`M ${start.x} ${start.y}`,
			`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
		].join(' ')
	}

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (_, gesture) => {
				const dx = gesture.moveX - center
				const dy = gesture.moveY - center
				let ang = Math.atan2(dy, dx) * (180 / Math.PI) + 90
				if (ang < 0) ang += 360
				setAngle(ang)
				setProgress(ang / 360)
			}
		})
	).current

	const markerPos = polarToCartesian(angle)

	return (
		<View style={styles.container}>
			<Svg height={size} width={size}>
				{/* Background */}
				<Circle
					cx={center}
					cy={center}
					r={radius}
					stroke='#ddd'
					strokeWidth={strokeWidth}
					fill='none'
				/>
				{/* Progress Arc */}
				<Path
					d={describeArc(progress * 360)}
					stroke='green'
					strokeWidth={strokeWidth}
					fill='none'
					strokeLinecap='round'
				/>
				{/* Marker */}
				<Circle cx={markerPos.x} cy={markerPos.y} r={strokeWidth / 2} fill='red' />
			</Svg>

			{/* Gesture Layer */}
			<View
				style={[
					StyleSheet.absoluteFillObject,
					{ width: size, height: size, alignSelf: 'center' }
				]}
				{...panResponder.panHandlers}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CircularTimer
