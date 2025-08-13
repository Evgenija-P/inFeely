import CalendarComponent from './CalendarComponent'
import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const DateTimePickerDetails = () => {
	const { state, setField } = useMealContext()
	const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false)

	// При монтуванні — одразу записуємо поточний час у контекст
	useEffect(() => {
		if (!state.dateTime) {
			setField('dateTime', new Date().toISOString())
		}
	}, [])

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
			<View style={{ width: '100%', position: 'relative' }}>
				<Pressable
					onPress={() => setIsShowDateTimePicker(!isShowDateTimePicker)}
					style={styles.btn}
				>
					<Text style={styles.text}>{formatDateTime(state.dateTime)}</Text>
				</Pressable>
				{isShowDateTimePicker && <CalendarComponent />}
			</View>
		</View>
	)
}

export default DateTimePickerDetails

const styles = StyleSheet.create({
	detailWrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		gap: 8
	},
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
	},
	calendar: {
		marginTop: 16,
		width: '100%',
		backgroundColor: Colors.light.background,
		borderRadius: 24
	}
})
