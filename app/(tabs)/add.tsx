import Header from 'components/Header'
import MealComponent from 'components/MealComponent'
import { ThemedText } from 'components/ThemedText'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddScreen() {
	console.log('AddScreen rendered')
	// const { token, user } = useAuth()
	// const [isAuthenticated, setIsAuthenticated] = useState(false)
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'flex-start'

				// paddingBottom: 24
			}}
		>
			<Header>
				<ThemedText type='defaultSemiBold'>Add Meal</ThemedText>
			</Header>

			<MealComponent chapterType='before' />
		</SafeAreaView>
	)
}
