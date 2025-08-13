import MultiSlider from '@ptomasroos/react-native-multi-slider'

import BaseWrapper from './BaseWrapper'
import { MealComponentProps } from './MealComponent'
import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { Dimensions, View } from 'react-native'

const textValues = [
	{
		title: 'Don’t know',
		text: ['', '']
	},
	{
		title: 'Hangry',
		text: ['I feel irritated and impatient.', ' Hunger makes me lose my temper quickly.']
	},
	{
		title: 'Starving',
		text: ['I feel weak and dizzy.', 'I can’t think straight. My body begs for food.']
	},
	{
		title: 'Very hungry',
		text: ['I feel intense hunger.', 'My stomach growls and I think only about eating.']
	},
	{
		title: 'Hungry',
		text: ['I feel clear hunger.', 'My body sends signals, and I know I need food soon.']
	},
	{
		title: 'Slightly hungry',
		text: ['I feel a little empty.', 'It’s not urgent, but I could eat something.']
	},
	{
		title: 'Neutral',
		text: [
			'I feel neither hungry nor full.',
			'My body is in balance, and I’m not thinking about food.'
		]
	},
	{
		title: 'Slightly full',
		text: ['I feel light satisfaction.', 'I could eat more, but I’m okay stopping now.']
	},
	{
		title: 'Full',
		text: ['I feel comfortably full.', 'My hunger is gone, and my body feels content.']
	},
	{
		title: 'Very full',
		text: ['I feel heavy.', 'There’s pressure in my belly, and I don’t want more food.']
	},
	{
		title: 'Uncomfortably full',
		text: [
			'I feel bloated and regretful.',
			'My body feels slow, and I wish I had stopped earlier.'
		]
	},
	{
		title: 'Stuffed',
		text: [
			'I feel overfilled.',
			'It’s hard to move or breathe comfortably. I feel overwhelmed.'
		]
	}
]

const ranges = [
	{ min: 1, max: 9, color: Colors.light.ellipse_red, index: 1 },
	{ min: 9, max: 18, color: Colors.light.ellipse_pink, index: 2 },
	{ min: 18, max: 27, color: Colors.light.ellipse_yellow, index: 3 },
	{ min: 27, max: 36, color: Colors.light.ellipse_green, index: 4 },
	{ min: 36, max: 45, color: Colors.light.ellipse_dark_green, index: 5 },
	{ min: 45, max: 54, color: Colors.light.ellipse_dark_green, index: 6 },
	{ min: 54, max: 63, color: Colors.light.ellipse_dark_green, index: 7 },
	{ min: 63, max: 72, color: Colors.light.ellipse_green, index: 8 },
	{ min: 72, max: 81, color: Colors.light.ellipse_yellow, index: 9 },
	{ min: 81, max: 90, color: Colors.light.ellipse_pink, index: 10 },
	{ min: 90, max: 101, color: Colors.light.ellipse_red, index: 11 }
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

const HungryLevel = ({ chapterType }: MealComponentProps) => {
	const { state, setField } = useMealContext()

	const screenWidth = Dimensions.get('window').width
	const onValuesChange = (values: number[]) => {
		if (chapterType === 'before') {
			setField('hungryLevel', values[0])
		} else {
			setField('fullLevel', values[0])
		}
	}

	const { title, text } =
		getTextByValue(chapterType === 'before' ? state.hungryLevel : state.fullLevel) ||
		textValues[0]

	return (
		<BaseWrapper style={{}}>
			<View style={{ gap: 8 }}>
				<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
					{chapterType === 'after' ? 'How full are you?' : '	How hungry are you?'}
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
					values={[chapterType === 'before' ? state.hungryLevel : state.fullLevel || 0]}
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
							valuePicker(
								chapterType === 'before' ? state.hungryLevel : state.fullLevel
							) ?? Colors.light.ellipse_lite,
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
						borderColor:
							valuePicker(
								chapterType === 'before' ? state.hungryLevel : state.fullLevel
							) ?? Colors.light.ellipse_lite,
						backgroundColor: 'white',
						top: 8,
						boxShadow: '0px 0px 0px 2px rgba(255, 255, 255)'
					}}
				/>
			</View>
		</BaseWrapper>
	)
}

export default HungryLevel
