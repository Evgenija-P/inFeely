import { Check, Cross, Hide, Show } from 'assets/images/icons/icons'

import { Colors } from 'constants/Colors'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export type InputType = 'email' | 'password' | 'text'

export type BaseInputProps = {
	placeholder?: string
	icon?: React.ReactNode
	keyboardType?: 'default' | 'numeric' | 'email-address'
	onChangeText?: (text: string) => void
	value?: string
	heightValue: number
	type?: InputType
	onValidationChange?: (isValid: boolean) => void
}
const BaseInput = ({
	placeholder,
	icon,
	keyboardType,
	onChangeText,
	value,
	heightValue,
	type = 'text',
	onValidationChange
}: BaseInputProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [secure, setSecure] = useState(type === 'password')

	const handleChangeText = (text: string) => {
		onChangeText?.(text)
		const errorMessage = validateField(type, text)
		setError(errorMessage)
		onValidationChange?.(!errorMessage)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	const validateField = (fieldType: InputType, input: string): string | null => {
		if (fieldType === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(input)) return 'Invalid email format'
		}
		if (fieldType === 'password') {
			if (input.length < 8) return 'Minimum 8 characters'
			if (!/[A-Z]/.test(input)) return 'Must contain a capital letter'
			if ((input.match(/\d/g) || []).length < 2) return 'Must contain at least 2 digits'
		}
		return null
	}

	const IconsComponent = ({ typeInput }: { typeInput: InputType }) => {
		if (typeInput === 'text') return null

		const shouldShowStatusIcon = value !== ''

		return (
			<View style={styles.iconBlock}>
				{typeInput === 'password' && (
					<TouchableOpacity onPress={() => setSecure(prev => !prev)}>
						<Text>{secure ? <Hide /> : <Show />}</Text>
					</TouchableOpacity>
				)}

				{shouldShowStatusIcon && (value && !error ? <Check /> : <Cross />)}
			</View>
		)
	}

	return (
		<View className='w-full flex items-center justify-center relative mx-auto'>
			{icon && <View style={styles.iconWrapper}>{icon}</View>}

			<TextInput
				style={[
					styles.input,
					{
						height: heightValue,
						borderColor: error
							? Colors.light.error
							: value && !error
								? Colors.light.ellipse_green
								: 'transparent',
						borderWidth: error || (value && !error) ? 1 : 0
					}
				]}
				onFocus={() => setIsFocused(true)}
				onBlur={handleBlur}
				onChangeText={handleChangeText}
				value={value}
				secureTextEntry={secure}
				placeholder={isFocused || value ? '' : placeholder}
				placeholderTextColor='#00000050'
				keyboardType={keyboardType || 'default'}
				className={`${icon ? 'pl-12' : 'pl-6'} pr-12 outline-none`}
			/>

			<IconsComponent typeInput={type} />

			{/* 🔴 Повідомлення про помилку */}
			{error && <Text style={styles.error}>{error}</Text>}
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
		borderRadius: 24,
		borderColor: 'transparent',
		borderWidth: 0
	},
	iconWrapper: {
		position: 'absolute',
		left: 16,
		top: '50%',
		transform: [{ translateY: '-50%' }],
		width: 24,
		height: 24,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconBlock: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 24,
		gap: 8,
		position: 'absolute',
		right: 16,
		top: '50%',
		transform: [{ translateY: -12 }]
	},
	error: {
		position: 'absolute',
		bottom: -18,
		left: 4,
		color: 'red',
		fontSize: 12,
		fontFamily: 'OnestRegular'
	}
})
