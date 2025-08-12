import AddImageInMeal from './AddImageInMeal'
import BaseWrapper from './BaseWrapper'
import DetailsMeal from './DetailsMeal'
import HungryLevel from './HungryLevel'
import MealLabel from './MealLabel'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type StateType = 'before' | 'after'

type ToggleButtonProps = {
	label: string
	isActive: boolean
	onPress: () => void
}

const ToggleButton = ({ label, isActive, onPress }: ToggleButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, { backgroundColor: isActive ? Colors.light.main : '#fff' }]}
		>
			<Text style={[styles.buttonText, { color: isActive ? '#fff' : Colors.light.main }]}>
				{label.charAt(0).toUpperCase() + label.slice(1)}
			</Text>
		</TouchableOpacity>
	)
}

const MealComponent = () => {
	const { state, setField } = useMealContext()
	const [selected, setSelected] = useState<StateType>('before')
	const [isShowButtons, setIsShowButtons] = useState(false)

	useEffect(() => {
		if (state.label && state.hungryLevel) {
			setIsShowButtons(true)
		}
	}, [state.label, state.hungryLevel])

	useEffect(() => {}, [state.label, state.hungryLevel])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.buttonWrapper}>
				{(['before', 'after'] as StateType[]).map(type => (
					<ToggleButton
						key={type}
						label={type}
						isActive={selected === type}
						onPress={() => setSelected(type)}
					/>
				))}
			</View>
			<BaseWrapper>
				<AddImageInMeal />
				<MealLabel />
			</BaseWrapper>
			<DetailsMeal />
			<HungryLevel />
			<Text>{isShowButtons}</Text>
			{isShowButtons && <TouchableOpacity>TouchableOpacity </TouchableOpacity>}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 16,
		paddingTop: 24
	},
	buttonWrapper: {
		height: 48,
		padding: 2,
		borderWidth: 2,
		borderColor: '#fff',
		width: '100%',
		borderRadius: 24,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: '50%',
		height: 42,
		borderRadius: 24,
		paddingHorizontal: 24,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 14,
		lineHeight: 22,
		fontFamily: 'OnestMedium'
	}
})

export default MealComponent
