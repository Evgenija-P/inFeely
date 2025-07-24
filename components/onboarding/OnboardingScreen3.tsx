import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { ThemedText } from 'components/ThemedText'
import TimePickerModal from 'components/dateTime/TimePickerModal'

import { SlideProps } from './OnboardingScreen'

import { Colors } from 'constants/Colors'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const OnboardingScreen3 = ({ data, setData }: SlideProps) => {
	const [values, setValues] = useState(data.period)
	console.log(values)

	useEffect(() => {
		setValues(data.period)
	}, [data.period])

	useEffect(() => {
		const handler = setTimeout(() => {
			setData(prev => ({ ...prev, period: values }))
		}, 500)

		return () => clearTimeout(handler)
	}, [values, setData])

	const onSliderChange = (vals: number[]) => {
		setValues(vals)
		setData(prev => ({ ...prev, isChangePeriod: true }))
	}

	// const onSliderChangeFinish = (vals: number[]) => {}

	const onStartTimeChange = (date: Date) => {
		const newStart = date.getHours() * 60 + date.getMinutes()
		setValues([newStart, values[1]])
	}

	const onEndTimeChange = (date: Date) => {
		const newEnd = date.getHours() * 60 + date.getMinutes()
		setValues([values[0], newEnd])
	}

	const getDateFromMinutes = (minutes: number) => {
		const date = new Date()
		date.setHours(Math.floor(minutes / 60), minutes % 60)
		return date
	}
	// const toMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes()

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: 64 }}>
			<View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
				<ThemedText type='defaultSemiBold' style={{ textAlign: 'center', marginBottom: 8 }}>
					What time do you usually eat?
				</ThemedText>
				<Text style={{ textAlign: 'center', fontSize: 14, opacity: 0.5 }}>
					( you can change it anytime later )
				</Text>
			</View>

			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<View style={{ flexDirection: 'row', gap: 24 }}>
					<TimePickerModal
						label='From'
						value={getDateFromMinutes(values[0])}
						onChange={onStartTimeChange}
					/>
					<TimePickerModal
						label='To'
						value={getDateFromMinutes(values[1])}
						onChange={onEndTimeChange}
					/>
				</View>

				<View className='w-full h-5 bg-white rounded-3xl p-[4px] flex items-center justify-center'>
					<MultiSlider
						values={values}
						sliderLength={280}
						onValuesChange={onSliderChange}
						// onValuesChangeFinish={onSliderChangeFinish}
						min={0}
						max={1440}
						step={1}
						allowOverlap={false}
						snapped
						selectedStyle={{ backgroundColor: Colors.light.accent, height: 16 }}
						unselectedStyle={{ backgroundColor: '#fff', height: 16 }}
						markerStyle={{
							height: 16,
							width: 16,
							borderRadius: 16,
							borderWidth: 2,
							borderColor: Colors.light.accent,
							backgroundColor: 'white',
							top: 8,
							boxShadow: '0px 0px 0px 2px rgba(255, 255, 255)'
						}}
					/>
				</View>
			</View>
		</View>
	)
}

export default OnboardingScreen3
