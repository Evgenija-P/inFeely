import { DayPoints } from 'types/meals.type'

import { Colors } from 'constants/Colors'
import { colorPicker } from 'helpers/colorPicker'
import { StyleSheet, View, ViewProps } from 'react-native'

export type DayCircleProps = ViewProps & {
	dayInfo?: DayPoints
}

const DayCircle = ({ style, dayInfo }: DayCircleProps) => {
	// const circleColor = (point?: number) => {
	// 	if (typeof point !== 'number') return undefined

	// 	if (point > 0 && point < 20) {
	// 		return Colors.light.ellipse_red
	// 	} else if (point >= 20 && point < 40) {
	// 		return Colors.light.ellipse_pink
	// 	} else if (point >= 40 && point < 60) {
	// 		return Colors.light.ellipse_yellow
	// 	} else if (point >= 60 && point < 80) {
	// 		return Colors.light.ellipse_green
	// 	} else if (point >= 80 && point <= 100) {
	// 		return Colors.light.ellipse_dark_green
	// 	}
	// 	return undefined
	// }

	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.l,
					{
						backgroundColor: colorPicker(dayInfo?.dinner) ?? Colors.light.ellipse_lite
					},
					style
				]}
			/>
			<View
				style={[
					styles.m,
					{
						backgroundColor: colorPicker(dayInfo?.lunch) ?? Colors.light.ellipse
					},
					style
				]}
			/>
			<View
				style={[
					styles.s,
					{
						backgroundColor: colorPicker(dayInfo?.breakfast) ?? Colors.light.main
					},
					style
				]}
			/>
		</View>
	)
}

export default DayCircle

const styles = StyleSheet.create({
	wrapper: {
		width: 40,
		height: 40,
		position: 'relative'
	},
	s: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -8 }, { translateY: -8 }],
		width: 16,
		height: 16,
		borderRadius: 8
	},
	m: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -14 }, { translateY: -14 }],
		width: 28,
		height: 28,
		borderRadius: 14
	},
	l: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -20 }, { translateY: -20 }],
		width: 40,
		height: 40,
		borderRadius: 20
	}
})
