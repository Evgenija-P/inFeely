import { ThemedText } from './ThemedText'
import BaseLabelButton from './ui/BaseLabelButton'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { StyleSheet, View } from 'react-native'

const MealLabel = () => {
	const { state, setField } = useMealContext()
	const labels = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink']
	const isActiveLabel = (label: string) => state.label === label

	return (
		<View style={styles.container}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Give your meal a label
			</ThemedText>
			<View style={styles.labelWrapper}>
				{labels.map(mealLabel => (
					<BaseLabelButton
						key={mealLabel}
						label={mealLabel}
						isActive={isActiveLabel}
						fnc={() => setField('label', mealLabel)}
					/>
				))}
			</View>
		</View>
	)
}

export default MealLabel

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center'
	},
	labelWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8
	},
	label: {
		width: '30%',
		height: 38,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.background,
		opacity: 0.5,
		padding: 8,
		borderRadius: 24
	},
	labelText: {
		textAlign: 'center',
		textTransform: 'capitalize',
		color: Colors.light.main,
		fontSize: 14,
		lineHeight: 22,
		fontWeight: '500',
		fontFamily: 'OnestMedium'
	}
})
