import DayCircle from './DayCircle'

import { Colors } from 'constants/Colors'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function WeekCalendar() {
	const today = dayjs()

	// Генеруємо масив дат: 3 дні до сьогодні, сьогодні, 3 дні після
	const weekDays = useMemo(() => {
		let days = []
		for (let i = -3; i <= 3; i++) {
			days.push(today.add(i, 'day'))
		}
		return days
	}, [today])

	return (
		<FlatList
			data={weekDays}
			horizontal
			contentContainerStyle={styles.list}
			keyExtractor={item => item.format('YYYY-MM-DD')}
			renderItem={({ item }) => {
				const isToday = item.isSame(today, 'day')
				return (
					<View style={[styles.dayContainer, isToday && styles.today]}>
						<Text style={[styles.dayText]}>{item.format('dd').charAt(0)}</Text>
						<DayCircle />
						<View style={[styles.textWrapper, isToday && styles.todayTextWrapper]}>
							<Text style={[styles.dateText, isToday && styles.todayText]}>
								{item.format('D')}
							</Text>
						</View>
					</View>
				)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		height: 96,
		justifyContent: 'center'
		// paddingHorizontal: 16
	},
	dayContainer: {
		width: 40,
		display: 'flex',
		alignItems: 'center',
		gap: 2,
		paddingVertical: 4,
		backgroundColor: '#f4f4f4',
		marginHorizontal: 5.5
	},
	today: {
		width: 52,
		backgroundColor: '#fff',
		paddingHorizontal: 6,

		borderRadius: 24
	},
	textWrapper: {
		width: 22,
		height: 22,
		borderRadius: 11,

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	todayTextWrapper: {
		backgroundColor: Colors.light.main
	},
	dayText: {
		fontSize: 14,
		fontFamily: 'OnestExtraBold'
	},
	dateText: {
		fontSize: 14,
		fontFamily: 'OnestMedium'
	},
	todayText: { color: '#fff' }
})
