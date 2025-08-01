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
		className?: string
		onPress?: () => void
		title: string
		isDisabled?: boolean
		bgStyle: 'white' | 'accent'
		icon?: React.ReactNode
		imageSource?: ImageSourcePropType
	}

const BaseButton = ({
	onPress,
	className,
	title,
	isDisabled,
	bgStyle,
	icon,
	imageSource
}: BaseButtonProps) => {
	const currenButtonStyle = bgStyle === 'white' ? 'bg-white' : 'bg-accent'

	const currentTextStyle = bgStyle === 'white' ? 'text-primary' : 'text-white'

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled || false}
			className={`${className} ${currenButtonStyle} disabled:opacity-50`}
			style={[styles.button, isDisabled && { opacity: 0.5 }]}
		>
			{icon}
			{imageSource && (
				<Image source={imageSource} style={styles.image} resizeMode='contain' />
			)}
			<Text className={`${currentTextStyle}`} style={styles.buttonText}>
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

		outline: 'none',

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
