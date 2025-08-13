// OnboardingScreen.tsx
import Header from 'components/Header'
import BaseButton from 'components/ui/BaseButton'

import OnboardingScreen1 from './OnboardingScreen1'
import OnboardingScreen2 from './OnboardingScreen2'
import OnboardingScreen3 from './OnboardingScreen3'
import OnboardingScreen4 from './OnboardingScreen4'

import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type OnboardingData = {
	name: string
	goal: string
	period: number[]
	isChangePeriod: boolean
	email: string
	password: string
}

export type SlideProps = {
	data: OnboardingData
	setData: React.Dispatch<React.SetStateAction<OnboardingData>>
}

const slides = [
	(props: SlideProps) => <OnboardingScreen1 {...props} />,
	(props: SlideProps) => <OnboardingScreen2 {...props} />,
	(props: SlideProps) => <OnboardingScreen3 {...props} />,
	(props: SlideProps) => <OnboardingScreen4 {...props} />
]

export default function OnboardingScreen() {
	const [index, setIndex] = useState(0)
	const [data, setData] = useState({
		name: '',
		goal: '',
		period: [6 * 60, 20 * 60],
		isChangePeriod: false,
		email: '',
		password: ''
	})

	const disabled =
		index === 0
			? data.name === ''
			: index === 1
				? data.goal === ''
				: index === 2
					? !data.isChangePeriod
					: true

	return (
		<SafeAreaView
			style={{ flex: 1, paddingTop: 32, paddingBottom: 24, justifyContent: 'space-between' }}
		>
			<Header style='mb-12'>
				{/* Пагінація */}
				<View className='w-1/3 flex flex-row items-center justify-center'>
					{slides.map((_, i) => (
						<View
							key={i}
							style={{
								height: 6,
								width: 20,
								borderRadius: 4,
								marginHorizontal: 4,
								backgroundColor: '#252622',
								opacity: i === index ? 1 : 0.1
							}}
						/>
					))}
				</View>
			</Header>

			<View className='flex-1 justify-between items-center'>
				<View
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center'
					}}
					className='mx-auto'
				>
					{slides[index]({ data, setData })}
				</View>

				{index !== 3 && (
					<BaseButton
						onPress={() => setIndex(index + 1)}
						title='Continue'
						className='mb-0'
						isDisabled={disabled}
						bgStyle='accent'
					/>
				)}
			</View>
		</SafeAreaView>
	)
}
