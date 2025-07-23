import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { ThemedText } from 'components/ThemedText'

import { useState } from 'react'
import { Text, View } from 'react-native'

// Допоміжні функції
const toMinutes = (hours: number, minutes: number) => hours * 60 + minutes
const toHoursAndMinutes = (totalMinutes: number) => {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60
	return { hours, minutes }
}

// Уявний компонент TimePicker (просто для прикладу)
const TimePicker = ({
	hours,
	minutes,
	onChange
}: {
	hours: number
	minutes: number
	onChange: (h: number, m: number) => void
}) => {
	// Тут має бути твій таймпікер, що викликає onChange при зміні часу
	// Для прикладу: два input для годин та хвилин
	return (
		<View style={{ flexDirection: 'row', gap: 10 }}>
			<Text>Години: </Text>
			<Text
				onPress={() => onChange((hours + 1) % 24, minutes)}
				style={{ padding: 10, backgroundColor: '#ddd' }}
			>
				{hours}
			</Text>
			<Text>Хвилини: </Text>
			<Text
				onPress={() => onChange(hours, (minutes + 5) % 60)}
				style={{ padding: 10, backgroundColor: '#ddd' }}
			>
				{minutes}
			</Text>
		</View>
	)
}

const OnboardingScreen3 = () => {
	// Стейт зберігає час у хвилинах від початку доби (0 - 1440)
	const [values, setValues] = useState([6 * 60, 18 * 60]) // для прикладу — з 20:00 до 80:00 (потрібно підкоригувати до 0-1439)

	// Обробник зміни бігунка
	const onSliderChange = (vals: number[]) => {
		setValues(vals)
	}

	// Обробник зміни часу з таймпікера
	const onStartTimeChange = (hours: number, minutes: number) => {
		const newStart = toMinutes(hours, minutes)
		// Запобігаємо, щоб початок був більшим за кінець
		if (newStart <= values[1]) {
			setValues([newStart, values[1]])
		}
	}
	const onEndTimeChange = (hours: number, minutes: number) => {
		const newEnd = toMinutes(hours, minutes)
		if (newEnd >= values[0]) {
			setValues([values[0], newEnd])
		}
	}
	const to12HourFormat = (hours24: number, minutes: number) => {
		const period = hours24 >= 12 ? 'PM' : 'AM'
		let hours12 = hours24 % 12
		if (hours12 === 0) hours12 = 12
		return { hours12, minutes, period }
	}

	// Розпаковуємо хвилини назад у години та хвилини
	const startHM = toHoursAndMinutes(values[0])
	const endHM = toHoursAndMinutes(values[1])

	const start12 = to12HourFormat(startHM.hours, startHM.minutes)
	const end12 = to12HourFormat(endHM.hours, endHM.minutes)

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 32 }}>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
				find your time
			</ThemedText>

			{/* Таймпікери */}
			<View style={{ flexDirection: 'row', gap: 24, marginBottom: 24 }}>
				<View>
					<Text>Початок:</Text>
					<TimePicker
						hours={startHM.hours}
						minutes={startHM.minutes}
						onChange={onStartTimeChange}
					/>
				</View>
				<View>
					<Text>Кінець:</Text>
					<TimePicker
						hours={endHM.hours}
						minutes={endHM.minutes}
						onChange={onEndTimeChange}
					/>
				</View>
			</View>

			{/* Бігунок */}
			<MultiSlider
				values={values}
				sliderLength={280}
				onValuesChange={onSliderChange}
				min={0}
				max={24 * 60} // 0 - 1440 хвилин
				step={1}
				allowOverlap={false}
				snapped
				selectedStyle={{ backgroundColor: '#80876E', height: 10 }}
				unselectedStyle={{ backgroundColor: '#EEE', height: 10 }}
				markerStyle={{
					height: 24,
					width: 24,
					borderRadius: 12,
					borderWidth: 5,
					borderColor: '#80876E',
					backgroundColor: 'white',
					top: 3
				}}
			/>

			<Text style={{ marginTop: 20 }}>
				Вибраний діапазон: {startHM.hours}:{startHM.minutes.toString().padStart(2, '0')} -{' '}
				{endHM.hours}:{endHM.minutes.toString().padStart(2, '0')}
			</Text>
		</View>
	)
}

export default OnboardingScreen3
