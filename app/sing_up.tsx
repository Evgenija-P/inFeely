import ArrowBack from 'components/ArrowBack'
import { ThemedText } from 'components/ThemedText'

import { Colors } from 'constants/Colors'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SingUpScreen = () => {
	return (
		<SafeAreaView
			style={{ flex: 1, paddingTop: 24, paddingBottom: 24, justifyContent: 'space-between' }}
		>
			<View style={styles.container}>
				{/* Кнопка назад */}
				<View style={{ width: '33%' }}>
					<ArrowBack href='/' />
				</View>

				<View style={styles.imageWrapper}>
					<Image
						source={require('../assets/images/Logo.svg')}
						style={{ width: 157, height: 56 }}
					/>
				</View>
				<View style={{ width: '33%' }} />
			</View>

			<View style={styles.pageWrapper}>
				<ThemedText
					type='title'
					style={{ marginBottom: 32, textAlign: 'center', color: Colors.light.text }}
				>
					This is SingUp Screen
				</ThemedText>
			</View>
		</SafeAreaView>
	)
}

export default SingUpScreen

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 48
	},
	imageWrapper: {
		width: '33%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pageWrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 144,
		paddingBottom: 24,
		backgroundColor: Colors.light.background
	}
})
