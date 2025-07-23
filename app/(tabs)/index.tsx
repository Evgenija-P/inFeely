import ProtectedRoute from 'components/ProtectedRoute'

import { Text, View } from 'react-native'

export default function HomeScreen() {
	// const isAuthenticated = false

	return (
		<ProtectedRoute isFirstRender>
			<View className='flex-1 items-center justify-center bg-accent'>
				<Text className='text-xl text-ellipse_green'>NativeWind works!</Text>
			</View>
		</ProtectedRoute>
	)
}
