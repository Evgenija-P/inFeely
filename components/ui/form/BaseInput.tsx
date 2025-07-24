import { Hide, Show } from 'assets/images/icons/icons'

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
	height: number
	type?: InputType
}
const BaseInput = ({
	placeholder,
	icon,
	keyboardType,
	onChangeText,
	value,
	height,
	type = 'text'
}: BaseInputProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [secure, setSecure] = useState(type === 'password')

	const handleBlur = () => {
		setIsFocused(false)
		const errorMessage = validateField(type, value || '')
		setError(errorMessage)
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

	return (
		<View className='w-full flex items-center justify-center relative mx-auto'>
			{icon && <View style={styles.iconWrapper}>{icon}</View>}

			<TextInput
				style={[styles.input, { height: height }]}
				onFocus={() => setIsFocused(true)}
				onBlur={handleBlur}
				onChangeText={onChangeText}
				value={value}
				secureTextEntry={secure}
				placeholder={isFocused || value ? '' : placeholder}
				placeholderTextColor='#00000050'
				keyboardType={keyboardType || 'default'}
				className={`${icon ? 'pl-12' : 'pl-6'} pr-12 outline-none`}
			/>
			{/* 👁 Показати/приховати пароль */}
			{type === 'password' && (
				<TouchableOpacity style={styles.eyeIcon} onPress={() => setSecure(prev => !prev)}>
					<Text>{secure ? <Hide /> : <Show />}</Text>
				</TouchableOpacity>
			)}

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
		borderRadius: 24
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
	eyeIcon: {
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
