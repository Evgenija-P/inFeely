import { Colors } from 'constants/Colors'
import { StyleSheet, Text, View } from 'react-native'

const AuthScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>AuthScreen</Text>
		</View>
	)
}

export default AuthScreen

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.light.main,
		fontFamily: 'OnestMedium',
		marginBottom: 20
	}
})
