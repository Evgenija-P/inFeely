import { DayPoints } from 'types/meals.type'

import { Colors } from 'constants/Colors'
import { valuePicker } from 'helpers/colorPicker'
import { StyleSheet, View, ViewProps } from 'react-native'

export type DayCircleProps = ViewProps & {
	dayInfo?: DayPoints
}

const DayCircle = ({ style, dayInfo }: DayCircleProps) => {
	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.l,
					{
						backgroundColor: valuePicker(dayInfo?.dinner) ?? Colors.light.ellipse_lite
					},
					style
				]}
			/>
			<View
				style={[
					styles.m,
					{
						backgroundColor: valuePicker(dayInfo?.lunch) ?? Colors.light.ellipse
					},
					style
				]}
			/>
			<View
				style={[
					styles.s,
					{
						backgroundColor: valuePicker(dayInfo?.breakfast) ?? Colors.light.main
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
