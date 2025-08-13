import { useMealContext } from 'contexts/MealContext'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

const TimePickerComponent = () => {
	const { state, setField } = useMealContext()

	const initialDate = state.dateTime ? dayjs(state.dateTime) : dayjs()

	const [time, setTime] = useState(initialDate.format('h:mm'))
	const [period, setPeriod] = useState(initialDate.format('A'))

	useEffect(() => {
		if (!time || !time.includes(':')) return
		if (!state.dateTime) return

		const date = dayjs(state.dateTime)
		const [hourStr, minuteStr] = time.split(':')
		const hoursRaw = parseInt(hourStr, 10)
		const minutesRaw = parseInt(minuteStr, 10)

		// якщо не число або не повні дані, не оновлюємо
		if (isNaN(hoursRaw) || isNaN(minutesRaw)) return

		let hours = hoursRaw
		if (period === 'PM' && hours < 12) hours += 12
		if (period === 'AM' && hours === 12) hours = 0

		const updatedDateTime = date.hour(hours).minute(minutesRaw).second(0).toISOString()

		setField('dateTime', updatedDateTime)
	}, [time, period])

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Ends</Text>
			<View
				style={{
					width: '70%',
					flexDirection: 'row',
					alignItems: 'center',
					gap: 8,
					justifyContent: 'flex-end'
				}}
			>
				<TextInput
					style={styles.timeInput}
					value={time}
					onChangeText={setTime}
					keyboardType='numeric'
				/>

				<View style={styles.periodWrapper}>
					{['AM', 'PM'].map(p => (
						<Pressable
							key={p}
							style={[styles.periodBtn, period === p && styles.activePeriod]}
							onPress={() => setPeriod(p)}
						>
							<Text style={styles.periodText}>{p}</Text>
						</Pressable>
					))}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 4,
		gap: 8
	},
	label: {
		fontSize: 16,
		fontWeight: '500',
		width: '30%'
	},
	timeInput: {
		width: '30%',
		height: 32,
		backgroundColor: 'rgba(120, 120, 128, 0.12)',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		minWidth: 60,
		textAlign: 'center',
		fontSize: 16
	},
	periodWrapper: {
		height: 32,
		flexDirection: 'row',
		backgroundColor: 'rgba(120, 120, 128, 0.12)',
		borderRadius: 8,
		overflow: 'hidden',
		padding: 2
	},
	periodBtn: {
		width: 54,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	activePeriod: {
		backgroundColor: '#fff',
		borderColor: 'rgba(0, 0, 0, 0.04)',
		borderWidth: 0.5,
		borderRadius: 6,
		boxShadow: '0px 2.9px 7.74px 0px rgba(0, 0, 0, 0.12)'
	},
	periodText: {
		fontWeight: '600'
	}
})

export default TimePickerComponent
