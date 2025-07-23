// OnboardingScreen.tsx
import BaseButton from 'components/ui/BaseButton'

import { Arrow } from 'assets/images/icons/icons'

import BaseLink from '../ui/BaseLink'

import OnboardingScreen1 from './OnboardingScreen1'
import OnboardingScreen2 from './OnboardingScreen2'
import OnboardingScreen3 from './OnboardingScreen3'
import OnboardingScreen4 from './OnboardingScreen4'

import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type OnboardingData = {
	name: string
	goal: string
	period: string[]
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
		period: ['', ''],
		email: '',
		password: ''
	})

	const disabled =
		index === 0
			? data.name === ''
			: index === 1
				? data.goal === ''
				: index === 2
					? data.period[0] === '' || data.period[1] === ''
					: index === 3
						? data.email === '' || data.password === ''
						: true

	return (
		<SafeAreaView
			style={{ flex: 1, paddingTop: 32, paddingBottom: 24, justifyContent: 'space-between' }}
		>
			<View className='w-full flex flex-row items-center justify-between shrink mb-12'>
				{/* Кнопка назад */}
				<View className='w-1/3'>
					<BaseLink
						href='/'
						type='custom'
						icon={<Arrow />}
						className='w-[18px] h-[18px] flex items-center justify-start'
					/>
				</View>

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
				<View className='w-1/3 ' />
			</View>
			<View className='flex-1 justify-between items-center'>
				<View
					style={{
						flex: 1,
						width: '100%',
						alignItems: 'center',
						paddingHorizontal: 16
					}}
					className='mx-auto'
				>
					{slides[index]({ data, setData })}
				</View>

				<Text>{JSON.stringify(data)}</Text>
				<BaseButton
					onPress={() => setIndex(index + 1)}
					title='Continue'
					className='mb-0'
					isDisabled={disabled}
				/>
			</View>
		</SafeAreaView>
	)
}
