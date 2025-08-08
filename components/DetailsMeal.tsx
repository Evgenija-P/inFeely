import { Bracket } from 'assets/images/icons/icons'

import BaseWrapper from './BaseWrapper'
import DateTimePickerDetails from './DateTimePickerDetails'
import { ThemedText } from './ThemedText'

import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const DetailsMeal = () => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	return (
		<BaseWrapper style={{ position: 'relative' }}>
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
		gap: 32
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
