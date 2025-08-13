import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { MealComponentProps } from './MealComponent'
import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { valuePicker } from 'helpers/colorPicker'
import { getTextByValue } from 'helpers/textPicker'
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

const ReflectionMood = ({ chapterType }: MealComponentProps) => {
	const { state, setField } = useMealContext()

	const onValuesChange = (values: number[]) => {
		if (chapterType === 'before') {
			setField('feelingLevelBefore', values[0])
		} else {
			setField('feelingLevelAfter', values[0])
		}
	}

	const { title, text } =
		getTextByValue(
			chapterType === 'before' ? state.feelingLevelBefore : state.feelingLevelAfter,
			textValues
		) || textValues[0]

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
					values={[
						chapterType === 'before'
							? state.feelingLevelBefore
							: state.feelingLevelAfter || 0
					]}
					sliderLength={Dimensions.get('window').width * 0.85}
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
								chapterType === 'before'
									? state.feelingLevelBefore
									: state.feelingLevelAfter
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
								chapterType === 'before'
									? state.feelingLevelBefore
									: state.feelingLevelAfter
							) ?? Colors.light.ellipse_lite,
						backgroundColor: 'white',
						top: 8,
						boxShadow: '0px 0px 0px 2px rgba(255, 255, 255)'
					}}
				/>
			</View>
		</View>
	)
}

export default ReflectionMood
