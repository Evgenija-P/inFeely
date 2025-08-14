import Header from 'components/Header'
import MealComponent from 'components/MealComponent'
import { ThemedText } from 'components/ThemedText'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddScreen() {
	console.log('AddScreen rendered')
	// const { token, user } = useAuth()
	// const [isAuthenticated, setIsAuthenticated] = useState(false)
	return (
		// <ProtectedRoute isFirstRender={false} isAuthenticated={true}>
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				paddingTop: 80,
				paddingBottom: 80
			}}
		>
			<Header>
				<ThemedText type='defaultSemiBold'>Add Meal</ThemedText>
			</Header>

			<MealComponent chapterType='before' />
		</SafeAreaView>
		// </ProtectedRoute>
	)
}
