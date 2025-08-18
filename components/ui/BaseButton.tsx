import { Colors } from 'constants/Colors'
import {
	ButtonProps,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	TextProps,
	TouchableOpacity
} from 'react-native'

export type BaseButtonProps = ButtonProps &
	TextProps & {
		// type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'

		onPress?: () => void
		title: string
		isDisabled?: boolean
		bgStyle: 'white' | 'accent'
		icon?: React.ReactNode
		imageSource?: ImageSourcePropType
	}

const BaseButton = ({
	onPress,
	title,
	isDisabled,
	bgStyle,
	icon,
	imageSource
}: BaseButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled || false}
			style={[
				styles.button,
				isDisabled && { opacity: 0.5 },
				bgStyle === 'white'
					? { backgroundColor: Colors.light.placeholder }
					: { backgroundColor: Colors.light.accent }
			]}
		>
			{icon}
			{imageSource && (
				<Image source={imageSource} style={styles.image} resizeMode='contain' />
			)}
			<Text
				style={[
					styles.buttonText,
					bgStyle === 'white'
						? { color: Colors.light.main }
						: { color: Colors.light.placeholder }
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default BaseButton

const styles = StyleSheet.create({
	button: {
		minWidth: 358,
		maxWidth: '100%',
		height: 54,

		paddingHorizontal: 8,
		paddingVertical: 16,

		borderRadius: 24,
		borderWidth: 1,
		borderColor: Colors.light.accent,

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8
	},
	buttonText: {
		fontSize: 14,
		lineHeight: 22,
		fontFamily: 'OnestSemiBold',
		textTransform: 'uppercase'
	},
	image: {
		width: 24,
		height: 24
	}
})
