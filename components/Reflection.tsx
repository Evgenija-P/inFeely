import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { Bracket } from 'assets/images/icons/icons'

import BaseWrapper from './BaseWrapper'
import MotivationsLabels from './MotivationsLabels'
import ReflectionMood from './ReflectionMood'
import { ThemedText } from './ThemedText'

import { useMealContext } from 'contexts/MealContext'
import { useState } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'

const ReflectionComponent = () => {
	const { state, setField } = useMealContext()
	const [isShowDetails, setIsShowDetails] = useState(false)
	const screenWidth = Dimensions.get('window').width

	return (
		<BaseWrapper style={{}}>
			<View style={{ gap: 8 }}>
				<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
					Reflection
				</ThemedText>

				<ThemedText type='default' style={{ textAlign: 'center', opacity: 0.5 }}>
					How are you feeling?
				</ThemedText>

				<Pressable
					onPress={() => setIsShowDetails(!isShowDetails)}
					style={[
						styles.arrowBtn,
						isShowDetails && { transform: [{ rotate: '180deg' }] }
					]}
				>
					<Bracket />
				</Pressable>

				{isShowDetails && (
					<View style={styles.detailsWrapper}>
						<MotivationsLabels />
						<ReflectionMood />
					</View>
				)}
			</View>
		</BaseWrapper>
	)
}

export default ReflectionComponent

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
