import { ThemedText } from 'components/ThemedText'

import { View } from 'react-native'

const OnboardingScreen4 = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 32 }}>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
				last step
			</ThemedText>
		</View>
	)
}

export default OnboardingScreen4
