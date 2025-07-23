import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { IAuthFormData } from 'types/auth.interface'

const AuthScreen = () => {
	const [isReg, setIsReg] = useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: IAuthFormData) => {
		console.log(data)
		reset()
	}

	return (
		<View className='flex items-center justify-center h-full bg-red-500'>
			<Text className='text-2xl text-green-500 font-semibold'>AuthScreen</Text>
		</View>
	)
}

export default AuthScreen
