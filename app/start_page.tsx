import { ThemedText } from 'components/ThemedText'
import OnboardingScreen from 'components/onboarding/OnboardingScreen'
import BaseButton from 'components/ui/BaseButton'
import BaseLink from 'components/ui/BaseLink'

import { useState } from 'react'
import { Image, View } from 'react-native'

const StartScreen = () => {
	const [isShownRegisterBlock, setIsShownRegisterBlock] = useState(false)

	return !isShownRegisterBlock ? (
		<View className='w-full h-full flex flex-col items-center justify-center bg-background pt-[144px] pb-6'>
			<View className='flex flex-col gap-4 items-center justify-between mb-[64px] w-full'>
				<Image
					source={require('../assets/images/Logo.svg')}
					className='w-[157px] h-[56px] mx-auto'
				/>
				<ThemedText className='text-primary text-center' type='default'>
					Track how you feel. <br /> Stay in touch with yourself.{' '}
				</ThemedText>
				<Image
					source={require('../assets/images/sing_in.png')}
					className='w-[157px] h-[56px] mx-auto'
				/>
			</View>
			<View className='flex flex-col gap-2'>
				<BaseButton
					onPress={() => {
						setIsShownRegisterBlock(true)
					}}
					title='get started'
				/>
				<ThemedText className='text-primary text-center' type='default'>
					or
				</ThemedText>
				<BaseLink
					href='/sing_in'
					text='Sign in'
					className='text-lg underline underline-offset-1 mx-auto'
					type='default'
				/>
			</View>
		</View>
	) : (
		<OnboardingScreen />
	)
}

export default StartScreen
