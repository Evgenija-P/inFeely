import { ThemedText } from 'components/ThemedText'

import { Colors } from 'constants/Colors'
import { Dimensions, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export type BaseLabelButtonProps = TouchableOpacityProps & {
	label: string
	isActive: (label: string) => boolean
	fnc: () => void
	widthValue?: number
}

const BaseLabelButton = ({ label, isActive, fnc, widthValue }: BaseLabelButtonProps) => {
	const screenWidth = Dimensions.get('window').width - 16 * 4 - 8 * 2
	const buttonWidth = screenWidth * (widthValue || 0.32)

	return (
		<TouchableOpacity
			style={[
				styles.label,
				isActive(label) && {
					opacity: 1,
					backgroundColor: Colors.light.accent
				},
				{ width: buttonWidth }
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
		// width: '32%',
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
