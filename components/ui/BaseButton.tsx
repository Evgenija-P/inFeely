import { ButtonProps, StyleSheet, Text, TextProps, TouchableOpacity } from 'react-native'

export type BaseButtonProps = ButtonProps &
	TextProps & {
		// type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
		className?: string
		onPress?: () => void
		title: string
	}

const BaseButton = ({ onPress, className, title }: BaseButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${className} min-w-[358px] max-w-full h-[54px] px-2 py-4 rounded-3xl outline-none bg-accent`}
		>
			<Text className='uppercase' style={styles.buttonText}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default BaseButton

const styles = StyleSheet.create({
	buttonText: {
		color: '#fff',
		fontSize: 14,
		lineHeight: 22,
		alignSelf: 'center',
		fontFamily: 'OnestSemiBold'
	}
})
