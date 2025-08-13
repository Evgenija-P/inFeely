import { Bracket } from 'assets/images/icons/icons'

import BaseWrapper from './BaseWrapper'
import { MealComponentProps } from './MealComponent'
import MotivationsLabels from './MotivationsLabels'
import NoteInput from './NoteInput'
import ReflectionMood from './ReflectionMood'
import SatisfactionLabels from './SatisfactionLabels'
import { ThemedText } from './ThemedText'

import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const ReflectionComponent = ({ chapterType }: MealComponentProps) => {
	const [isShowDetails, setIsShowDetails] = useState(false)

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
						{chapterType === 'before' ? <MotivationsLabels /> : <SatisfactionLabels />}

						<ReflectionMood chapterType={chapterType} />
						<NoteInput chapterType={chapterType} />
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
