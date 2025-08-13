import { ThemedText } from './ThemedText'
import BaseLabelButton from './ui/BaseLabelButton'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { StyleSheet, View } from 'react-native'

const SatisfactionLabels = () => {
	const { state, setField } = useMealContext()
	const labels = ['Mostly body', 'Mostly mind', 'Both', 'Neither']

	const isActiveLabel = (label: string) => state.satisfactionLevel === label

	return (
		<View style={styles.container}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				What did you satisfy – body or mind?
			</ThemedText>
			<View style={styles.labelWrapper}>
				{labels.map(satLabel => (
					<BaseLabelButton
						key={satLabel}
						label={satLabel}
						isActive={isActiveLabel}
						fnc={() => setField('satisfactionLevel', satLabel)}
						widthValue={0.49}
					/>
				))}
			</View>
		</View>
	)
}

export default SatisfactionLabels

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 24
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
