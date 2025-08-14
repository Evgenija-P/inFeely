/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemedText } from 'components/ThemedText'
import BaseButton from 'components/ui/BaseButton'
import BaseInput from 'components/ui/form/BaseInput'

import AppleIcon from 'assets/images/apple_icon.png'
import GoogleIcon from 'assets/images/google_icon.png'
import { Lock, Mail } from 'assets/images/icons/icons'

import { discovery, googleAuthConfig } from 'config/authConfig'

import { OnboardingData, SlideProps } from './onboarding/OnboardingScreen'

import { BASE_URL } from 'constants/API'
import { useAuth } from 'contexts/AuthContext'
import { exchangeCodeAsync, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

type FormData = Omit<OnboardingData, 'isChangePeriod'>

const SocialAndEmailAuth = ({ data, setData }: SlideProps) => {
	const { login } = useAuth()
	const router = useRouter()
	const [isValidValues, setIsValidValues] = useState({ email: false, password: false })

	const [request, response, promptAsync] = useAuthRequest(googleAuthConfig, discovery)

	useEffect(() => {
		if (response?.type === 'success') {
			const fetchToken = async () => {
				if (!request || !request.codeVerifier) {
					throw new Error('Missing code_verifier. Authorization flow broken.')
				}

				const tokenResult = await exchangeCodeAsync(
					{
						clientId: googleAuthConfig.clientId!,
						code: response.params.code,
						redirectUri: googleAuthConfig.redirectUri,
						extraParams: {
							code_verifier: request.codeVerifier,
							client_secret: process.env.APP_GOOGLE_CLIENT_SECRET! // використовуємо тільки для веб-розробки! у реальному додатку нам таке не треба!
						}
					},
					discovery
				)

				const userInfo = await fetch(discovery.userInfoEndpoint!, {
					headers: {
						Authorization: `Bearer ${tokenResult.accessToken}`
					}
				})
				const user = await userInfo.json()

				router.replace({
					pathname: '/'
				})

				const regData = { userName: data.name, ...data, ...user }
				const { isChangePeriod, ...rest } = regData
				const formData: FormData = rest
				console.log('formData', formData)
			}

			fetchToken().catch(console.error)
		}
	}, [response])

	const handleGoogleLogin = async () => {
		// await promptAsync()

		router.replace({
			pathname: '/welcome'
		})
	}
	const onRegistration = async () => {
		const { isChangePeriod, ...rest } = data
		const formData: FormData = rest
		console.log('formData', formData)
		try {
			const response = await fetch(`${BASE_URL}/api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (!response.ok) {
				throw new Error('Failed to register')
			}

			const result = await response.json()
			login(result.user, result.token)

			console.log('Registration successful:', result)

			router.replace({
				pathname: '/welcome'
			})
		} catch (error) {
			console.error('Registration error:', error)
		}
	}

	const disabled =
		data.name === '' || data.goal === '' || !isValidValues.email || !isValidValues.password
	return (
		<>
			<View style={{ width: '100%', gap: 20 }}>
				<BaseInput
					placeholder='Email'
					onChangeText={value => setData(prev => ({ ...prev, email: value }))}
					onValidationChange={isValid =>
						setIsValidValues(prev => ({ ...prev, email: isValid }))
					}
					value={data.email}
					heightValue={56}
					icon={<Mail />}
					type='email'
					keyboardType='email-address'
				/>
				<BaseInput
					placeholder='Password'
					onChangeText={value => setData(prev => ({ ...prev, password: value }))}
					onValidationChange={isValid =>
						setIsValidValues(prev => ({ ...prev, password: isValid }))
					}
					value={data.password}
					heightValue={56}
					icon={<Lock />}
					type='password'
				/>
				<BaseButton
					onPress={() => onRegistration()}
					title='Continue'
					className='mb-0'
					isDisabled={disabled}
					bgStyle='accent'
				/>
			</View>
			<ThemedText type='default' style={{ textAlign: 'center', marginVertical: 16 }}>
				or
			</ThemedText>
			<View style={{ width: '100%', gap: 16 }}>
				<BaseButton
					onPress={() => handleGoogleLogin()}
					title='Continue'
					className='mb-0'
					bgStyle='white'
					imageSource={GoogleIcon}
				/>
				<BaseButton
					onPress={() => onRegistration()}
					title='Continue'
					className='mb-0'
					bgStyle='white'
					imageSource={AppleIcon}
				/>
			</View>
		</>
	)
}

export default SocialAndEmailAuth
