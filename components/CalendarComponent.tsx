import TimePickerComponent from './TimePickerComponent'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import dayjs from 'dayjs'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarComponent = () => {
	const today = dayjs().format('YYYY-MM-DD')

	const { state, setField } = useMealContext()

	const initialDate = state.dateTime ? dayjs(state.dateTime).format('YYYY-MM-DD') : null

	const [selectedDay, setSelectedDay] = useState<string | null>(initialDate)

	// Формуємо об'єкт для markedDates
	const markedDates = {
		...(selectedDay && {
			[selectedDay]: {
				selected: true,
				selectedColor: '#90aa8b66',
				selectedTextColor: Colors.light.ellipse_green,
				customStyles: {
					text: {
						fontWeight: 'bold' as 'bold'
					}
				}
			}
		}),
		[today]: {
			marked: false,
			customStyles: {
				text: {
					color: Colors.light.ellipse_green,
					fontWeight: 'bold' as 'bold'
				}
			}
		}
	}

	return (
		<View style={styles.wrapper}>
			<Calendar
				markingType={'custom'}
				markedDates={markedDates}
				onDayPress={day => {
					setSelectedDay(day.dateString)

					const dateWithTime = dayjs(day.dateString)
						.hour(dayjs().hour())
						.minute(dayjs().minute())
						.second(0)
						.toISOString()

					setField('dateTime', dateWithTime)
				}}
				theme={{
					arrowColor: Colors.light.ellipse_green,
					todayTextColor: Colors.light.ellipse_green,
					textDayFontWeight: '500',
					textMonthFontWeight: '600',
					textMonthFontSize: 18
				}}
				style={styles.calendar}
			/>
			<TimePickerComponent />
		</View>
	)
}

export default CalendarComponent

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		top: 54,
		left: '50%',
		zIndex: 100,
		transform: [{ translateX: -179 }],
		backgroundColor: '#fff',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
	},
	calendar: {
		minWidth: 358,
		height: 'auto',
		borderRadius: 12,
		elevation: 2
	},
	timeWrapper: {
		width: '100%',
		marginHorizontal: 16,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
