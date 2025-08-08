import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarComponent = () => {
	return (
		<View>
			<Calendar
				markingType={'period'}
				markedDates={{
					'2012-05-15': { marked: true, dotColor: '#50cebb' },
					'2012-05-16': { marked: true, dotColor: '#50cebb' },
					'2012-05-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
					'2012-05-22': { color: '#70d7c7', textColor: 'white' },
					'2012-05-23': {
						color: '#70d7c7',
						textColor: 'white',
						marked: true,
						dotColor: 'white'
					},
					'2012-05-24': { color: '#70d7c7', textColor: 'white' },
					'2012-05-25': { endingDay: true, color: '#50cebb', textColor: 'white' }
				}}
			/>
		</View>
	)
}

const DateTimePickerDetails = () => {
	const { state, setField } = useMealContext()
	const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false)
	const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString())

	// При монтуванні — одразу записуємо поточний час у контекст
	useEffect(() => {
		setField('dateTime', new Date().toISOString())
	}, [])

	// Коли відкритий пікер — оновлюємо час щосекунди
	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined

		if (isShowDateTimePicker) {
			interval = setInterval(() => {
				const now = new Date().toISOString()
				setCurrentDateTime(now)
				setField('dateTime', now)
			}, 1000)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isShowDateTimePicker])

	function formatDateTime(dateISO: string) {
		const date = new Date(dateISO)
		const today = new Date()

		const isToday =
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()

		const time = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		})

		return isToday ? `Today, ${time}` : date.toLocaleDateString('en-US') + `, ${time}`
	}

	return (
		<View style={styles.detailWrapper}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Time
			</ThemedText>
			<Pressable
				onPress={() => setIsShowDateTimePicker(!isShowDateTimePicker)}
				style={styles.btn}
			>
				<Text style={styles.text}>{formatDateTime(currentDateTime)}</Text>
			</Pressable>
			{isShowDateTimePicker && <CalendarComponent />}
		</View>
	)
}

export default DateTimePickerDetails

const styles = StyleSheet.create({
	detailWrapper: { width: '100%', display: 'flex', alignItems: 'center', gap: 8 },
	btn: {
		width: '100%',
		height: 54,
		borderRadius: 24,
		backgroundColor: Colors.light.background,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 22,
		fontWeight: '500',
		fontFamily: 'OnestMedium'
	}
})
