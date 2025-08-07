// import { Plus } from 'assets/images/icons/icons'
// import { ThemedText } from './ThemedText'
// import { Colors } from 'constants/Colors'
// import { useState } from 'react'
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// type StateType = 'before' | 'after'
// type ToggleButtonProps = {
// 	label: string
// 	isActive: boolean
// 	onPress: () => void
// }
// const ToggleButton = ({ label, isActive, onPress }: ToggleButtonProps) => {
// 	return (
// 		<TouchableOpacity
// 			onPress={onPress}
// 			style={[styles.button, { backgroundColor: isActive ? Colors.light.main : '#fff' }]}
// 		>
// 			<Text style={[styles.buttonText, { color: isActive ? '#fff' : Colors.light.main }]}>
// 				{label.charAt(0).toUpperCase() + label.slice(1)}
// 			</Text>
// 		</TouchableOpacity>
// 	)
// }
// const MealComponent = () => {
// 	const [selected, setSelected] = useState<StateType>('before')
// 	return (
// 		<View style={styles.container}>
// 			<View style={[styles.buttonWrapper]}>
// 				{(['before', 'after'] as StateType[]).map(type => (
// 					<ToggleButton
// 						key={type}
// 						label={type}
// 						isActive={selected === type}
// 						onPress={() => setSelected(type)}
// 					/>
// 				))}
// 			</View>
// 			<View style={[styles.wrapper]}>
// 				<View
// 					style={{
// 						width: '100%',
// 						display: 'flex',
// 						gap: 8
// 					}}
// 				>
// 					<ThemedText type='default' style={{ textAlign: 'center' }}>
// 						Add some photos{' '}
// 					</ThemedText>
// 					<View
// 						style={{
// 							display: 'flex',
// 							flexDirection: 'row',
// 							justifyContent: 'center',
// 							gap: 10
// 						}}
// 					>
// 						{Array.from({ length: 3 }).map((_, index) => (
// 							<View key={index} style={styles.addPhotoButton}>
// 								{index === 0 && <Plus />}
// 							</View>
// 						))}
// 					</View>
// 				</View>
// 			</View>
// 		</View>
// 	)
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		gap: 16,
// 		paddingTop: 24
// 	},
// 	buttonWrapper: {
// 		height: 48,
// 		padding: 2,
// 		borderWidth: 2,
// 		borderColor: '#fff',
// 		width: '100%',
// 		borderRadius: 24,
// 		backgroundColor: '#fff',
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	button: {
// 		width: '50%',
// 		height: 42,
// 		borderRadius: 24,
// 		paddingHorizontal: 24,
// 		paddingVertical: 10,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	buttonText: {
// 		fontSize: 14,
// 		lineHeight: 22,
// 		fontFamily: 'OnestMedium'
// 	},
// 	wrapper: { width: '100%', borderRadius: 24, backgroundColor: '#fff', padding: 16 },
// 	addPhotoButton: {
// 		width: 102,
// 		height: 102,
// 		backgroundColor: Colors.light.background,
// 		borderRadius: 8,
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	}
// })
// export default MealComponent
import { Plus, Trash } from 'assets/images/icons/icons'

import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type StateType = 'before' | 'after'

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

const MealComponent = () => {
	const [selected, setSelected] = useState<StateType>('before')
	const [images, setImages] = useState<(string | null)[]>([null, null, null])
	const [showDeleteIndex, setShowDeleteIndex] = useState<number | null>(null)

	const handleAddImage = async () => {
		setShowDeleteIndex(null)
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1
		})

		if (!result.canceled && result.assets.length > 0) {
			const uri = result.assets[0].uri

			// Додаємо зображення у перший вільний слот
			setImages(prev => {
				const updated = [...prev]
				const firstEmptyIndex = updated.findIndex(item => item === null)
				if (firstEmptyIndex !== -1) {
					updated[firstEmptyIndex] = uri
				}
				return updated
			})
		}
	}

	const handleRemoveImage = (index: number) => {
		setShowDeleteIndex(null)
		setImages(prev => {
			const updated = prev.filter((_, i) => i !== index)
			// зсуваємо зображення, додаючи null у кінець
			while (updated.length < 3) updated.push(null)
			return updated
		})
	}

	return (
		<View style={styles.container}>
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

			<View style={styles.wrapper}>
				<ThemedText type='default' style={{ textAlign: 'center' }}>
					Add some photos
				</ThemedText>

				<View style={styles.photosWrapper}>
					{images.map((img, index) => {
						const isFirstEmpty = img === null && images.indexOf(null) === index

						return (
							<TouchableOpacity
								key={index}
								style={styles.addPhotoButton}
								onPress={
									img
										? () =>
												setShowDeleteIndex(
													showDeleteIndex === index ? null : index
												)
										: isFirstEmpty
											? handleAddImage
											: undefined
								}
								activeOpacity={0.8}
							>
								{img ? (
									<>
										<Image
											source={{ uri: img }}
											style={{
												width: '100%',
												height: '100%',
												borderRadius: 8
											}}
										/>
										{showDeleteIndex === index && (
											<TouchableOpacity
												style={styles.deleteButton}
												onPress={() => handleRemoveImage(index)}
											>
												<Trash />
											</TouchableOpacity>
										)}
									</>
								) : isFirstEmpty ? (
									<Plus />
								) : null}
							</TouchableOpacity>
						)
					})}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 16,
		paddingTop: 24
	},
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
	buttonText: {
		fontSize: 14,
		lineHeight: 22,
		fontFamily: 'OnestMedium'
	},
	wrapper: {
		width: '100%',
		borderRadius: 24,
		backgroundColor: '#fff',
		padding: 16
	},
	photosWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
		marginTop: 8
	},
	addPhotoButton: {
		width: 102,
		height: 102,
		backgroundColor: Colors.light.background,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		position: 'relative'
	},
	deleteButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 12,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	deleteText: {
		color: '#fff',
		fontSize: 14
	}
})

export default MealComponent
