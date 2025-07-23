import { ButtonProps, StyleSheet, Text, TextProps, TouchableOpacity } from 'react-native'

export type BaseButtonProps = ButtonProps &
	TextProps & {
		// type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
		className?: string
		onPress?: () => void
		title: string
		isDisabled?: boolean
	}

const BaseButton = ({ onPress, className, title, isDisabled }: BaseButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled || false}
			className={`${className} min-w-[358px] w-full h-[54px] px-2 py-4 rounded-3xl outline-none bg-accent disabled:opacity-50`}
			style={[styles.button, isDisabled && { opacity: 0.5 }]}
		>
			<Text className='uppercase' style={styles.buttonText}>
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
		backgroundColor: '#ABC123', // твій колір
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#fff',
		fontSize: 14,
		lineHeight: 22,
		fontFamily: 'OnestSemiBold',
		textTransform: 'uppercase'
	}
})
