import { Bracket } from 'assets/images/icons/icons'

import BaseWrapper from './BaseWrapper'
import DateTimePickerDetails from './DateTimePickerDetails'
import EatWith from './EatWith'
import Eating from './Eating'
import { MealComponentProps } from './MealComponent'
import TasteLevel from './TasteLevel'
import { ThemedText } from './ThemedText'

import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const DetailsMeal = ({ chapterType }: MealComponentProps) => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	return (
		<BaseWrapper style={{ position: 'relative', zIndex: 1 }}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Details
			</ThemedText>

			<ThemedText type='default' style={{ textAlign: 'center', opacity: 0.5 }}>
				{isShowDetails ? 'Think more about your meal' : 'Describe your meal'}
			</ThemedText>

			<Pressable
				onPress={() => setIsShowDetails(!isShowDetails)}
				style={[styles.arrowBtn, isShowDetails && { transform: [{ rotate: '180deg' }] }]}
			>
				<Bracket />
			</Pressable>

			{isShowDetails && (
				<View style={styles.detailsWrapper}>
					<DateTimePickerDetails />
					{chapterType === 'before' ? (
						<>
							<Eating />
							<EatWith />
						</>
					) : (
						<TasteLevel />
					)}
				</View>
			)}
		</BaseWrapper>
	)
}

export default DetailsMeal

const styles = StyleSheet.create({
	detailsWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: 32,
		zIndex: 10
	},
	arrowBtn: {
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		position: 'absolute',
		top: 16,
		right: 16
	}
})
