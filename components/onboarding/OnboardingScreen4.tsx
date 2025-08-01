import SocialAndEmailAuth from 'components/SocialAndEmailAuth'
import { ThemedText } from 'components/ThemedText'

import { SlideProps } from './OnboardingScreen'

import { View } from 'react-native'

const OnboardingScreen4 = ({ data, setData }: SlideProps) => {
	return (
		<View
			style={{ width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
		>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center', marginBottom: 32 }}>
				Create an account
			</ThemedText>

			<SocialAndEmailAuth data={data} setData={setData} />
		</View>
	)
}

export default OnboardingScreen4
