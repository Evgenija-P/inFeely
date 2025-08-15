/* eslint-disable @typescript-eslint/no-unused-vars */
import AddImageInMeal from './AddImageInMeal'
import BaseWrapper from './BaseWrapper'
import DescribeMeal from './DescribeMeal'
import DetailsMeal from './DetailsMeal'
import HungryLevel from './HungryLevel'
import MealLabel from './MealLabel'
import ReflectionComponent from './Reflection'
import BaseButton from './ui/BaseButton'
import BaseButtonLink from './ui/BseButtonLink'

import { BASE_URL } from 'constants/API'
import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type StateType = 'before' | 'after'

export type MealComponentProps = {
	chapterType: StateType
}

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

const MealComponent = ({ chapterType }: MealComponentProps) => {
	const { state, setField, dispatch } = useMealContext()
	const [selected, setSelected] = useState<StateType>(chapterType)

	const [isShowButtonsBefore, setIsShowButtonsBefore] = useState(false)
	const [isShowButtonsAfter, setIsShowButtonsAfter] = useState(false)

	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlmM2MxMDQ5MDkyMWY1ODgwYTk5N2QiLCJlbWFpbCI6InRlc3QxMUBnbWFpbC5jb20iLCJpYXQiOjE3NTUyNjYwNjQsImV4cCI6MTc1Nzg1ODA2NH0.vpLE5mek2mhpqitk4zXmLCRpj7kSu0tn4A9Y-JJE_8E'

	const user = {
		_id: '689f3c10490921f5880a997d'
	}

	useEffect(() => {
		setIsShowButtonsBefore(!!(state.label && state.hungryLevel))
	}, [state.label, state.hungryLevel])

	useEffect(() => {
		setIsShowButtonsAfter(!!(state.satisfactionLevel && state.fullLevel))
	}, [state.satisfactionLevel, state.fullLevel])

	const handleReset = () => {
		dispatch({ type: 'RESET' })
		setSelected('before')
	}

	const createMeal = async () => {
		const mealData = {
			...state,
			// прибираємо date, якщо він не потрібен
			date: undefined
		}

		console.log('Creating meal with data:', mealData)

		try {
			const response = await fetch(`${BASE_URL}/meal`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(mealData) // відправляємо весь state у JSON
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Failed to create meal')
			}

			const data = await response.json()
			console.log('Meal created successfully:', data)
			handleReset()
			router.push('/')
		} catch (error) {
			console.error('Error creating meal:', error)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<>
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
					{selected === 'before' ? <MealLabel /> : <DescribeMeal />}
				</BaseWrapper>
				<DetailsMeal chapterType={selected} />
				<HungryLevel chapterType={selected} />
				<ReflectionComponent chapterType={selected} />
			</>
			{selected === 'before' && isShowButtonsBefore && (
				<View style={{ width: '100%', gap: 8 }}>
					<BaseButtonLink bgStyle='accent' title='Eat with timer' href={'/timer'} />
					<BaseButton
						bgStyle='white'
						title='save and complete later'
						onPress={createMeal}
					/>
				</View>
			)}
			{selected === 'after' && isShowButtonsAfter && (
				<View style={{ width: '100%', gap: 8 }}>
					<BaseButton bgStyle='accent' title='save' onPress={createMeal} />
				</View>
			)}
		</ScrollView>
	)
}

export default MealComponent

const styles = StyleSheet.create({
	container: { alignItems: 'center', justifyContent: 'space-between', gap: 16 },
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
	buttonText: { fontSize: 14, lineHeight: 22, fontFamily: 'OnestMedium' }
})
