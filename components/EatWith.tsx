import { ThemedText } from './ThemedText'
import BaseLabelButton from './ui/BaseLabelButton'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { Pressable, StyleSheet, View } from 'react-native'

const EatWith = () => {
	const { state, setField } = useMealContext()
	const labels = ['alone', 'with family', 'with friends']
	const isActiveLabel = (label: string) => state.eatWith === label

	return (
		<View style={styles.container}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Who are you with?
			</ThemedText>
			<View style={styles.labelWrapper}>
				{labels.map(lab => (
					<BaseLabelButton
						key={lab}
						label={lab}
						isActive={isActiveLabel}
						fnc={() => setField('eatWith', lab)}
					/>
				))}
			</View>
			<Pressable
				onPress={() => setField('eatWith', 'other')}
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

export default EatWith

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
