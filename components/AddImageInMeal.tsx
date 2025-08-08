import { Plus, Trash } from 'assets/images/icons/icons'

import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const AddImageInMeal = () => {
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
		<View style={styles.wrapper}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
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
	)
}

export default AddImageInMeal

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8
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
