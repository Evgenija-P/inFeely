import { Colors } from 'constants/Colors'
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

type BaseTextAreaInputProps = TextInputProps & {
	onChangeText: (text: string) => void
	value: string
	numberOfLines?: number
	placeholder?: string
	heightValue: number
}

const BaseTextAreaInput = ({
	onChangeText,
	value,
	heightValue,
	numberOfLines,
	placeholder,
	style
}: BaseTextAreaInputProps) => {
	const [isFocused, setIsFocused] = useState(false)

	const handleBlur = () => {
		setIsFocused(false)
	}

	return (
		<TextInput
			style={[
				styles.input,
				isFocused ? { borderColor: 'transparent', borderWidth: 0 } : {},
				style
			]}
			onFocus={() => setIsFocused(true)}
			onBlur={handleBlur}
			onChangeText={onChangeText}
			value={value || ''}
			multiline={true}
			numberOfLines={numberOfLines}
			placeholder={isFocused || value ? value : placeholder || 'Enter your text here...'}
			placeholderTextColor='#00000050'
		/>
	)
}

export default BaseTextAreaInput

const styles = StyleSheet.create({
	input: {
		minWidth: 358,
		width: '100%',
		minHeight: 70,
		backgroundColor: Colors.light.background,
		paddingVertical: 16,
		paddingHorizontal: 29,
		fontSize: 14,
		lineHeight: 22,
		fontFamily: 'OnestRegular',
		color: Colors.light.main,
		borderRadius: 24,
		borderColor: 'transparent',
		borderWidth: 0,
		// outlineStyle: 'none',
		textAlignVertical: 'top'
	}
})
