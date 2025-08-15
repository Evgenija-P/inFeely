import TabLayout from './(tabs)/_layout'
import SingInScreen from './sing_in'
import StartScreen from './start_page'

import { Colors } from 'constants/Colors'
import { AuthProvider, useAuth } from 'contexts/AuthContext'
import { MealProvider } from 'contexts/MealContext'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

const AppContent = () => {
	// const { token, user } = useAuth()
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODlmM2MxMDQ5MDkyMWY1ODgwYTk5N2QiLCJlbWFpbCI6InRlc3QxMUBnbWFpbC5jb20iLCJpYXQiOjE3NTUyNjYwNjQsImV4cCI6MTc1Nzg1ODA2NH0.vpLE5mek2mhpqitk4zXmLCRpj7kSu0tn4A9Y-JJE_8E'

	const user = {
		_id: '689f3c10490921f5880a997d'
	}
	console.log('token, user', token, user)

	const [loaded] = useFonts({
		OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
		OnestMedium: require('../assets/fonts/Onest-Medium.ttf'),
		OnestSemiBold: require('../assets/fonts/Onest-SemiBold.ttf'),
		OnestExtraBold: require('../assets/fonts/Onest-ExtraBold.ttf')
	})

	if (!loaded) return null

	// if (!loaded) return <SplashScreen />

	if (!token) {
		return <StartScreen />
	}

	// if (!user?.isFirstRender) {
	// 	return <SingInScreen />
	// }

	return <TabLayout />
}

export default function RootLayout() {
	const colorScheme = 'light'

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: Colors[colorScheme].background,
				paddingHorizontal: 16
			}}
		>
			<AuthProvider>
				<MealProvider>
					{/* Примусово рендеримо Tabs */}
					{/* <TabLayout /> */}
					<AppContent />
					{/* <StatusBar style="auto" /> */}
					<StatusBar style='auto' />
				</MealProvider>
			</AuthProvider>
		</SafeAreaView>
	)
}
