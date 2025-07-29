import ProtectedRoute from 'components/ProtectedRoute'

import { Text, View } from 'react-native'

export default function HomeScreen() {
	const isAuthenticated = true
	const firstRender = false

	return (
		<ProtectedRoute isFirstRender={firstRender} isAuthenticated={isAuthenticated}>
			<View className='flex-1 items-center justify-center bg-accent'>
				<Text className='text-xl text-ellipse_green'>NativeWind works!</Text>
			</View>
		</ProtectedRoute>
	)
}
