import { ThemedText } from 'components/ThemedText'
import BaseInput from 'components/ui/form/BaseInput'

import { Lock, Mail } from 'assets/images/icons/icons'

import { SlideProps } from './OnboardingScreen'

import { View } from 'react-native'

const OnboardingScreen4 = ({ data, setData }: SlideProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center', marginBottom: 32 }}>
				Create an account
			</ThemedText>

			<View style={{ gap: 20 }}>
				<BaseInput
					placeholder='Email'
					onChangeText={value => setData(prev => ({ ...prev, email: value }))}
					value={data.email}
					height={56}
					icon={<Mail />}
					type='email'
					keyboardType='email-address'
				/>
				<BaseInput
					placeholder='Password'
					onChangeText={value => setData(prev => ({ ...prev, password: value }))}
					value={data.password}
					height={56}
					icon={<Lock />}
					type='password'
				/>
			</View>
			<ThemedText type='default' style={{ textAlign: 'center', marginVertical: 16 }}>
				or
			</ThemedText>

			<View></View>
		</View>
	)
}

export default OnboardingScreen4
