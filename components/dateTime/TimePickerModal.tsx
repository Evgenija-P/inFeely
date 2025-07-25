import DateTimePicker from '@react-native-community/datetimepicker'

import { useState } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'

type Props = {
	label: string
	value: Date
	onChange: (date: Date) => void
}

const TimePickerModal = ({ label, value, onChange }: Props) => {
	const [show, setShow] = useState(false)

	const handleChange = (_event: any, selectedDate?: Date) => {
		setShow(false)
		if (selectedDate) {
			onChange(selectedDate)
		}
	}

	const formatted = value.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	})

	return (
		<View>
			<Pressable
				style={{
					backgroundColor: '#f0f0f0',
					paddingVertical: 12,
					paddingHorizontal: 20,
					borderRadius: 16
				}}
				onPress={() => setShow(true)}
			>
				<Text>{formatted}</Text>
			</Pressable>

			{show && (
				<DateTimePicker
					value={value}
					mode='time'
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={handleChange}
					is24Hour={false} // або true — якщо хочеш підтримку обох форматів
				/>
			)}
		</View>
	)
}

export default TimePickerModal
