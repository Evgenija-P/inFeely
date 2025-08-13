import ProtectedRoute from 'components/ProtectedRoute'
import { ThemedText } from 'components/ThemedText'
import Timer from 'components/Timer'

import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Dummy GoogleLoginButton component for demonstration

export default function TimerScreen() {
	return (
		<ProtectedRoute isFirstRender={false} isAuthenticated={true}>
			<SafeAreaView
				style={{
					flex: 1,
					// justifyContent: 'flex-start',
					paddingTop: 24,
					paddingBottom: 24
				}}
			>
				<Timer />
			</SafeAreaView>
		</ProtectedRoute>
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
