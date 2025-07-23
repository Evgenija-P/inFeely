import { Colors } from 'constants/Colors'
import { StyleSheet, TextInput, View } from 'react-native'

export type BaseInputProps = {
	placeholder?: string
	icon?: React.ReactNode
	keyboardType?: 'default' | 'numeric' | 'email-address'
	onChangeText?: (text: string) => void
	value?: string
}
const BaseInput = ({ placeholder, icon, keyboardType, onChangeText, value }: BaseInputProps) => {
	return (
		<View className='w-full flex items-center justify-center relative mx-auto'>
			{icon && <View className='absolute left-6'>{icon}</View>}

			<TextInput
				style={styles.input}
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
				placeholderTextColor='#00000050'
				keyboardType={keyboardType || 'default'}
				className={`${icon ? 'pl-12' : 'pl-6'} outline-none`}
			/>
		</View>
	)
}

export default BaseInput

const styles = StyleSheet.create({
	input: {
		minWidth: 358,
		width: '100%',
		height: 70,
		backgroundColor: Colors.light.placeholder,
		paddingVertical: 24,
		paddingRight: 24,
		fontSize: 16,
		lineHeight: 22,
		fontFamily: 'OnestMedium',
		color: Colors.light.text,
		borderRadius: 24
	}
})
