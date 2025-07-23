// OnboardingScreen.tsx
import { Arrow } from 'assets/images/icons/icons'

import BaseLink from '../ui/BaseLink'

import { useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const slides = [
	{ title: 'Слайд 1', description: 'Пояснення 1' },
	{ title: 'Слайд 2', description: 'Пояснення 2' },
	{ title: 'Слайд 3', description: 'Пояснення 3' },
	{ title: 'Слайд 4', description: 'Пояснення 4' }
]

export default function OnboardingScreen() {
	const [index, setIndex] = useState(0)

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 32, paddingBottom: 24 }}>
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

			{/* Свайпер */}
			<Carousel
				width={width}
				height={500}
				data={slides}
				scrollAnimationDuration={500}
				onSnapToItem={setIndex}
				pagingEnabled
				loop={false}
				snapEnabled
				renderItem={({ index: i }) => (
					<View
						style={{
							width,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 20,
							marginTop: 48
						}}
					>
						<Text style={{ fontSize: 28, fontWeight: 'bold' }}>{slides[i].title}</Text>
						<Text style={{ fontSize: 18, marginTop: 20, color: '#555' }}>
							{slides[i].description}
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	)
}
