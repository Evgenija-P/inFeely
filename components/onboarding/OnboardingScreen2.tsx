import { ThemedText } from 'components/ThemedText'

import { SlideProps } from './OnboardingScreen'

import { Colors } from 'constants/Colors'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

const GOALS = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Eat more mindfully'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Reduce stress'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Improve sleep'
	},
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b9',
		title: 'Build better habits'
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f688',
		title: 'Take care of my body'
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d70',
		title: 'Feel more balanced'
	}
]

type ItemProps = { title: string }

const OnboardingScreen2 = ({ data, setData }: SlideProps) => {
	const isActive = (title: string) => data.goal === title

	const Item = ({ title }: ItemProps) => (
		<TouchableWithoutFeedback onPress={() => setData(prev => ({ ...prev, goal: title }))}>
			<View
				style={[
					styles.item,
					isActive(title) && {
						borderWidth: 1,
						borderColor: Colors.light.accent
					}
				]}
			>
				<ThemedText type='default'>{title}</ThemedText>
			</View>
		</TouchableWithoutFeedback>
	)

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: 32 }}>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ThemedText type='default' style={{ textAlign: 'center', marginBottom: 24 }}>
					Nice to meet you, {data.name} 👋
				</ThemedText>

				<ThemedText type='defaultSemiBold' style={{ textAlign: 'center', marginBottom: 8 }}>
					Now, what’s your main goal?
				</ThemedText>
				<Text style={{ textAlign: 'center', fontSize: 14, opacity: 0.5 }}>
					( you can change it anytime later )
				</Text>
			</View>
			<FlatList
				data={GOALS}
				renderItem={({ item }) => <Item title={item.title} />}
				keyExtractor={item => item.id}
				contentContainerStyle={{ gap: 8 }}
			/>
		</View>
	)
}

export default OnboardingScreen2

const styles = StyleSheet.create({
	item: {
		width: 358,
		height: 70,
		padding: 24,
		borderRadius: 24,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.placeholder
	}
})
