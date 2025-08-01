import { ThemedText } from 'components/ThemedText'

import { Colors } from 'constants/Colors'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

const WelcomeLoaderScreen = () => {
	const router = useRouter()

	useEffect(() => {
		const timeoutWelcomeScreen = setTimeout(() => {
			router.replace('/')
		}, 1500)

		return () => clearTimeout(timeoutWelcomeScreen)
	}, [])

	return (
		<View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<View style={styles.imageWrapper}>
				<View style={styles.imgL} />
				<View style={styles.imgM} />
				<View style={styles.imgS} />
			</View>
			<ThemedText type='defaultSemiBold' style={{ marginBottom: 16 }}>
				Welcome to InFeely 🌱
			</ThemedText>

			<ThemedText type='default'>Your space is loading, just breathe...</ThemedText>
		</View>
	)
}

export default WelcomeLoaderScreen

const styles = StyleSheet.create({
	imageWrapper: {
		width: 32,
		height: 32,
		marginBottom: 40,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	imgS: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: Colors.light.accent,
		opacity: 1,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -8 }, { translateY: -8 }]
	},
	imgM: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: Colors.light.accent,
		opacity: 0.4,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -12 }, { translateY: -12 }]
	},
	imgL: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: Colors.light.accent,
		opacity: 0.1,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -16 }, { translateY: -16 }]
	}
})
