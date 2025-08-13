import { ThemedText } from './ThemedText'
import BaseLabelButton from './ui/BaseLabelButton'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { Pressable, StyleSheet, View } from 'react-native'

const Eating = () => {
	const { state, setField } = useMealContext()
	const labels = ['at home', 'at work', 'restaurant']
	const isActiveLabel = (label: string) => state.place === label

	return (
		<View style={styles.container}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Where are you eating?
			</ThemedText>
			<View style={styles.labelWrapper}>
				{labels.map(place => (
					<BaseLabelButton
						key={place}
						label={place}
						isActive={isActiveLabel}
						fnc={() => setField('place', place)}
					/>
				))}
			</View>
			<Pressable
				onPress={() => setField('place', 'other')}
				style={{
					width: '100%',
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
	)
}

export default Eating

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		zIndex: 1
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
