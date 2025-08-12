import { ThemedText } from 'components/ThemedText'

import { Colors } from 'constants/Colors'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export type BaseLabelButtonProps = TouchableOpacityProps & {
	label: string
	isActive: (label: string) => boolean
	fnc: () => void
}

const BaseLabelButton = ({ label, isActive, fnc }: BaseLabelButtonProps) => {
	return (
		<TouchableOpacity
			style={[
				styles.label,
				isActive(label) && {
					opacity: 1,
					backgroundColor: Colors.light.accent
				}
			]}
			activeOpacity={0.8}
			onPress={() => fnc()}
		>
			<ThemedText
				type='defaultSemiBold'
				style={[
					styles.labelText,
					isActive(label) && {
						opacity: 1,
						color: Colors.light.placeholder
					}
				]}
			>
				{label}
			</ThemedText>
		</TouchableOpacity>
	)
}

export default BaseLabelButton

const styles = StyleSheet.create({
	label: {
		width: '32%',
		height: 38,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.background,
		opacity: 0.5,
		padding: 8,
		borderRadius: 24
	},
	labelText: {
		textAlign: 'center',
		textTransform: 'capitalize',
		color: Colors.light.main,
		fontSize: 14,
		lineHeight: 22,
		fontWeight: '500',
		fontFamily: 'OnestMedium'
	}
})
