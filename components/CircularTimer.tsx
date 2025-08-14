import { useRef, useState } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

const CircularTimer = ({ size = 300, strokeWidth = 20 }) => {
	const radius = (size - strokeWidth) / 2
	const center = size / 2

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
