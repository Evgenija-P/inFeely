import { ThemedText } from './ThemedText'
import BaseLabelButton from './ui/BaseLabelButton'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { Pressable, StyleSheet, View } from 'react-native'

const MotivationsLabels = () => {
	const { state, setField } = useMealContext()

	const labels = [
		'Physical hunger',
		'Nourish my body',
		'Routine',
		'Stress',
		'Boredom',
		'Comfort',
		'Social eating',
		'Cravings',
		'Sadness',
		'Reward'
	]

	const toggleMotivation = (label: string) => {
		const current = state.motivation
		if (current.includes(label)) {
			// Прибираємо
			setField(
				'motivation',
				current.filter(item => item !== label)
			)
		} else {
			// Додаємо
			setField('motivation', [...current, label])
		}
	}

	const isActiveLabel = (label: string) => state.motivation.includes(label)

	return (
		<View style={styles.container}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				What’s your motivation for eating?
			</ThemedText>
			<View style={styles.labelWrapper}>
				{labels.map(lab => (
					<BaseLabelButton
						key={lab}
						label={lab}
						isActive={isActiveLabel}
						fnc={() => toggleMotivation(lab)}
					/>
				))}{' '}
				<Pressable
					onPress={() => setField('motivation', 'other')}
					style={{
						width: '33%',
						height: 38,
						paddingVertical: 8,
						borderRadius: 24,
						backgroundColor: Colors.light.background,
						alignItems: 'center'
					}}
				>
					<ThemedText
						type='default'
						style={{ color: Colors.light.main, textAlign: 'center' }}
					>
						+
					</ThemedText>
				</Pressable>
			</View>
		</View>
	)
}

export default MotivationsLabels

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 32
	},
	labelWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8
	},
	label: {
		width: '33%',
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
