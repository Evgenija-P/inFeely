import MultiSlider from '@ptomasroos/react-native-multi-slider'

import BaseWrapper from './BaseWrapper'
import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useState } from 'react'
import { Dimensions, View } from 'react-native'

const textValues = [
	{
		title: 'Don’t know',
		text: ['', '']
	},
	{
		title: 'Shame 😔',
		text: [
			'I feel bad about myself.","I regret eating or how I act. I want to hide or disappear.'
		]
	},
	{
		title: 'Guilt 😞',
		text: [
			'I do something wrong.","I feel like I break a rule or mess up. There’s a heavy feeling in my chest.'
		]
	},
	{
		title: 'Disappointed 😕',
		text: [
			'It’s not what I want.","The food doesn’t satisfy me or I expect something else. I feel let down.'
		]
	},
	{
		title: 'Angry 😠',
		text: [
			'Something feels unfair or out of control.","I feel tension, frustration, or irritation. I might want to act out or shut down.'
		]
	},
	{
		title: 'Neutral 😐',
		text: ['I feel nothing special.","There’s no strong emotion. I just exist in this moment.']
	},

	{
		title: 'Relief 😌',
		text: ['I feel lighter now.","Something eases inside me. The tension fades.']
	},
	{
		title: 'Satisfied 🙂',
		text: [
			'I give my body what it needs.","I feel okay, balanced, and not too full. Everything feels right.'
		]
	},
	{
		title: 'Calm 😊',
		text: [
			'I feel peaceful.","My mind is quiet, there’s no stress around eating. I feel stable.'
		]
	},
	{
		title: 'Happy 😄',
		text: [
			'I enjoy the food and feel good.","It lifts my mood or gives energy. I smile inside.'
		]
	},
	{
		title: 'Grateful 🥰',
		text: [
			'I feel thankful for this meal.","There’s care, love, or comfort here. I feel connected.'
		]
	}
]

const ReflectionMood = () => {
	const { state, setField } = useMealContext()

	const screenWidth = Dimensions.get('window').width
	const onValuesChange = (values: number[]) => {
		setField('feelingLevel', values[0])
	}

	const ranges = [
		{ min: 1, max: 10, color: Colors.light.ellipse_red, index: 1 },
		{ min: 10, max: 20, color: Colors.light.ellipse_red, index: 2 },
		{ min: 20, max: 30, color: Colors.light.ellipse_pink, index: 3 },
		{ min: 30, max: 40, color: Colors.light.ellipse_pink, index: 4 },
		{ min: 40, max: 50, color: Colors.light.ellipse_yellow, index: 5 },
		{ min: 50, max: 60, color: Colors.light.ellipse_yellow, index: 6 },
		{ min: 60, max: 70, color: Colors.light.ellipse_green, index: 7 },
		{ min: 70, max: 80, color: Colors.light.ellipse_green, index: 8 },
		{ min: 80, max: 90, color: Colors.light.ellipse_dark_green, index: 9 },
		{ min: 90, max: 101, color: Colors.light.ellipse_dark_green, index: 10 }
	]

	const valuePicker = (point?: number) => {
		if (typeof point !== 'number' || point < 0 || point > 100) return undefined
		const range = ranges.find(r => point >= r.min && point < r.max)
		return range?.color
	}

	const getTextByValue = (point: number) => {
		if (typeof point !== 'number' || point < 0 || point > 100) return undefined
		const range = ranges.find(r => point >= r.min && point < r.max)
		if (!range) return textValues[0]

		if (range.index === undefined) return textValues[0]
		if (range.index >= textValues.length) return textValues[textValues.length - 1]
		return textValues[range.index] || textValues[0]
	}
	const { title, text } = getTextByValue(state.feelingLevel) || textValues[0]

	return (
		<BaseWrapper style={{}}>
			<View style={{ gap: 8 }}>
				<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
					How are you feeling right now?
				</ThemedText>

				<View>
					<ThemedText
						type='default'
						style={{
							textAlign: 'center',
							fontSize: 14,
							fontFamily: 'OnestRegular',
							lineHeight: 22
						}}
					>
						{text[0]}
					</ThemedText>
					<ThemedText
						type='default'
						style={{
							textAlign: 'center',
							fontSize: 14,
							fontFamily: 'OnestRegular',
							lineHeight: 22
						}}
					>
						{text[1]}
					</ThemedText>
				</View>
			</View>
			<View style={{ gap: 8 }}>
				<ThemedText
					type='defaultMedium'
					style={{
						textAlign: 'center',
						textTransform: 'uppercase'
					}}
				>
					{title}
				</ThemedText>
				<MultiSlider
					values={[state.feelingLevel || 0]}
					sliderLength={screenWidth - 64}
					onValuesChange={onValuesChange}
					min={0}
					max={100}
					step={1}
					allowOverlap={false}
					snapped
					containerStyle={{ height: 20 }}
					selectedStyle={{
						backgroundColor:
							valuePicker(state.feelingLevel) ?? Colors.light.ellipse_lite,
						height: 16,
						borderRadius: 16
					}}
					unselectedStyle={{
						backgroundColor: '#fff',
						height: 16,
						borderRadius: 16
					}}
					markerStyle={{
						height: 16,
						width: 16,
						borderRadius: 16,
						borderWidth: 2,
						borderColor: valuePicker(state.feelingLevel) ?? Colors.light.ellipse_lite,
						backgroundColor: 'white',
						top: 8,
						boxShadow: '0px 0px 0px 2px rgba(255, 255, 255)'
					}}
				/>
			</View>
		</BaseWrapper>
	)
}

export default ReflectionMood
