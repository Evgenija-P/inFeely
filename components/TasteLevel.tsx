import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { valuePicker } from 'helpers/colorPicker'
import { getTextByValue } from 'helpers/textPicker'
import { Dimensions, View } from 'react-native'

const textValues = [
	{
		title: "Don't know",
		text: ['', '']
	},
	{
		title: 'Disgusting 🤢',
		text: ['Really unpleasant —', 'hard to eat or finish.']
	},
	{
		title: 'Greasy 🍟',
		text: ['Feels heavy and oily —', 'not very pleasant after a few bites.']
	},
	{
		title: 'Too Sweet 🍬',
		text: ['Sugar stands out too much —', "it's overwhelming and hard to enjoy."]
	},
	{
		title: 'Too Salty 🧂',
		text: ['The saltiness is overpowering —', 'and distracts from the flavor.']
	},
	{
		title: 'Flavorless 😐',
		text: ['The food tastes bland —', 'lacks spices or character.']
	},
	{
		title: 'Okay 🙂',
		text: ['The food is fine —', 'not special, but it gets the job done.']
	},
	{
		title: 'Fresh 🥗',
		text: ['Tastes clean, light, and natural —', 'refreshing to eat.']
	},
	{
		title: 'Comforting 🫶',
		text: ['Feels warm, familiar, and soothing —', 'like a hug from the inside.']
	},
	{
		title: 'Tasty 🤤',
		text: ['Full of flavor and enjoyable —', 'hits the spot perfectly.']
	},
	{
		title: 'Delicious 😋',
		text: ['This meal tastes amazing and satisfying —', "it's a pleasure to eat."]
	}
]

const TasteLevel = () => {
	const { state, setField } = useMealContext()

	const onValuesChange = (values: number[]) => {
		setField('tasteLevel', values[0])
	}

	const { title, text } = getTextByValue(state.tasteLevel, textValues) || textValues[0]

	return (
		<View
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<View style={{ gap: 8 }}>
				<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
					How did it taste?
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
					values={[state.tasteLevel || 0]}
					sliderLength={Dimensions.get('window').width * 0.85}
					onValuesChange={onValuesChange}
					min={0}
					max={100}
					step={1}
					allowOverlap={false}
					snapped
					containerStyle={{ height: 20 }}
					selectedStyle={{
						backgroundColor: valuePicker(state.tasteLevel) ?? Colors.light.ellipse_lite,
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
						borderColor: valuePicker(state.tasteLevel) ?? Colors.light.ellipse_lite,
						backgroundColor: 'white',
						top: 8,
						boxShadow: '0px 0px 0px 2px rgba(255, 255, 255)'
					}}
				/>
			</View>
		</View>
	)
}

export default TasteLevel
