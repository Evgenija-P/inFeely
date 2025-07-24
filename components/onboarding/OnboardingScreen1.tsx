import { ThemedText } from 'components/ThemedText'
import BaseInput from 'components/ui/form/BaseInput'

import { SlideProps } from './OnboardingScreen'

import { View } from 'react-native'

const OnboardingScreen1 = ({ data, setData }: SlideProps) => {
	return (
		<View
			style={{
				width: '100%',
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: 32
			}}
		>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
				How can we call you?
			</ThemedText>
			<BaseInput
				placeholder='Enter your name'
				onChangeText={value => setData(prev => ({ ...prev, name: value }))}
				value={data.name}
				height={70}
			/>
		</View>
	)
}

export default OnboardingScreen1
