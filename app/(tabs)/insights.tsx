import ParallaxScrollView from 'components/ParallaxScrollView'
import { ThemedText } from 'components/ThemedText'
import { ThemedView } from 'components/ThemedView'

import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

// Dummy GoogleLoginButton component for demonstration

export default function InsightsScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#0e69f1', dark: '#f79c14' }}
			headerImage={
				<Image
					source={require('../../assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'>Welcome Insights Screen!</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute'
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		backgroundColor: 'white'
	}
})
