import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

import Footer from 'components/Footer'

import '../global.css'

import { Colors } from 'constants/Colors'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import 'react-native-reanimated'

export default function RootLayout() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	// const colorScheme = useColorScheme()
	const colorScheme = 'light'

	const [loaded] = useFonts({
		OnestRegular: require('../assets/fonts/Onest-Regular.ttf'),
		OnestMedium: require('../assets/fonts/Onest-Medium.ttf'),
		OnestSemiBold: require('../assets/fonts/Onest-SemiBold.ttf')
	})

	if (!loaded) {
		// Async font loading only occurs in development.
		return null
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: Colors[colorScheme].background,
				paddingHorizontal: 16
			}}
		>
			<ThemeProvider value={DefaultTheme}>
				<View style={{ flex: 1 }}>
					{/* Main content */}
					<View style={{ flex: 1 }}>
						<Stack>
							<Stack.Screen name='(tabs)' options={{ headerShown: false }} />

							<Stack.Screen name='start_page' options={{ headerShown: false }} />
							<Stack.Screen name='welcome' options={{ headerShown: false }} />
							<Stack.Screen name='sing_up' options={{ headerShown: false }} />

							<Stack.Screen name='+not-found' />
						</Stack>
					</View>

					{/* Footer */}
					<Footer />
				</View>

				<StatusBar style='auto' />
			</ThemeProvider>
		</SafeAreaView>
	)
}
