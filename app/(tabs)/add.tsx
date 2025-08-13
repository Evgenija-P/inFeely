import Header from 'components/Header'
import MealComponent from 'components/MealComponent'
import ProtectedRoute from 'components/ProtectedRoute'
import { ThemedText } from 'components/ThemedText'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddScreen() {
	return (
		<ProtectedRoute isFirstRender={false} isAuthenticated={true}>
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'flex-start',
					paddingTop: 24,
					paddingBottom: 24
				}}
			>
				<Header>
					<ThemedText type='defaultSemiBold'>Add Meal</ThemedText>
				</Header>

				<MealComponent chapterType='before' />
			</SafeAreaView>
		</ProtectedRoute>
	)
}
