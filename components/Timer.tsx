import { Plus } from 'assets/images/icons/icons'

import CircularTimePicker from './CircularTimePicker'
import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Timer = () => {
	const { state, setField } = useMealContext()
	const [isShowModal, setIsShowModal] = useState(false)
	// const progressRef = useRef<ProgressRef>(null)

	const toggleModal = () => {
		setIsShowModal(!isShowModal)
		console.log('Modal toggled:', !isShowModal)
	}

	// const onPlayTimer = () => {
	// 	if (progressRef.current) {
	// 		progressRef.current.play()
	// 	}
	// }

	// const onPauseTimer = () => {
	// 	if (progressRef.current) {
	// 		progressRef.current.pause()
	// 	}
	// }
	// const resetTimer = () => {
	// 	if (progressRef.current) {
	// 		progressRef.current.reAnimate()
	// 	}
	// }

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 24 }}>
				<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
					How long do you want to eat?
				</ThemedText>
				<ThemedText type='base' style={{ textAlign: 'center', marginTop: 8 }}>
					Recommended: 20–30 min for main meals
				</ThemedText>
			</View>
			{state.label ? (
				<View style={styles.button}>
					<View
						style={{
							width: 16,
							height: 16,
							borderRadius: 8,
							backgroundColor: Colors.light.ellipse_green
						}}
					/>
					<Text
						style={{
							fontSize: 14,
							fontFamily: 'OnestMedium',
							textTransform: 'capitalize'
						}}
					>
						{state.label}
					</Text>
				</View>
			) : (
				<TouchableOpacity onPress={() => toggleModal()} style={styles.button}>
					<Plus width='16' height='16' />
					<Text style={{ fontSize: 14, fontFamily: 'OnestMedium' }}>Add Meal</Text>
				</TouchableOpacity>
			)}
			{/* <CircularProgress
				ref={progressRef}
				value={100}
				radius={120}
				progressValueColor={'#fff'}
				duration={10000}
				strokeColorConfig={[
					{ color: 'red', value: 0 },
					{ color: 'skyblue', value: 50 },
					{ color: 'yellowgreen', value: 100 }
				]}
			/> */}
			<CircularTimePicker />
		</View>
	)
}

export default Timer

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'

		// paddingTop: 24
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		width: 123,
		height: 38,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 24,
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: 'transparent',
		marginBottom: 24
	}
})
