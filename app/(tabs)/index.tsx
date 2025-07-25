import ProtectedRoute from 'components/ProtectedRoute'

import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function HomeScreen() {
	const params = useLocalSearchParams()

	console.log('params:', params)

	const isAuthenticated = params.isAuthenticated || 'false'
	const firstRender = params.firstRender || 'true'

	return (
		<ProtectedRoute isFirstRender={firstRender} isAuthenticated={isAuthenticated}>
			<View className='flex-1 items-center justify-center bg-accent'>
				<Text className='text-xl text-ellipse_green'>NativeWind works!</Text>
			</View>
		</ProtectedRoute>
	)
}
