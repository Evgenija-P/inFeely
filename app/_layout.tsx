// import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
// // import Footer from 'components/Footer'
// import '../global.css'
// import { Colors } from 'constants/Colors'
// import { AuthProvider } from 'contexts/AuthContext'
// import { MealProvider } from 'contexts/MealContext'
// import { Colors } from 'constants/Colors'
// import { AuthProvider } from 'contexts/AuthContext'
// import { MealProvider } from 'contexts/MealContext'
// import { useFonts } from 'expo-font'
// import { Stack } from 'expo-router'
// import { Stack } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { SafeAreaView, View } from 'react-native'
// import 'react-native-reanimated'
// export default function RootLayout() {
// 	return (
// 		<SafeAreaView
// 			style={{
// 				flex: 1,
// 				backgroundColor: Colors[colorScheme].background,
// 				paddingHorizontal: 16
// 			}}
// 		>
// 			<ThemeProvider value={DefaultTheme}>
// 				<AuthProvider>
// 					<MealProvider>
// 						<View style={{ flex: 1 }}>
// 							{/* Main content */}
// 							<View style={{ flex: 1 }}>
// 								<Stack>
// 									<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
// 									<Stack.Screen
// 										name='start_page'
// 										options={{ headerShown: false }}
// 									/>
// 									<Stack.Screen name='welcome' options={{ headerShown: false }} />
// 									<Stack.Screen name='sing_up' options={{ headerShown: false }} />
// 									<Stack.Screen name='+not-found' />
// 								</Stack>
// 							</View>
// 							{/* Footer */}
// 							{/* <Footer /> */}
// 						</View>
// 						<StatusBar style='auto' />
// 					</MealProvider>
// 				</AuthProvider>
// 			</ThemeProvider>
// 		</SafeAreaView>
// 	)
// }
import TabLayout from './(tabs)/_layout'

import { Colors } from 'constants/Colors'
import { AuthProvider } from 'contexts/AuthContext'
import { MealProvider } from 'contexts/MealContext'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

// твій Tabs компонент

export default function RootLayout() {
	const [loaded] = useFonts({
		OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
		OnestMedium: require('../assets/fonts/Onest-Medium.ttf'),
		OnestSemiBold: require('../assets/fonts/Onest-SemiBold.ttf'),
		OnestExtraBold: require('../assets/fonts/Onest-ExtraBold.ttf')
	})

	if (!loaded) return null

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
					<TabLayout />
					<StatusBar style='auto' />
				</MealProvider>
			</AuthProvider>
		</SafeAreaView>
	)
}
