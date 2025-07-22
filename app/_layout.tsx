import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { useColorScheme } from '@/hooks/useColorScheme'

import '@/global.css'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import 'react-native-reanimated'

export default function RootLayout() {
	const [isAuthenticated, setIsAuthenticated] = useState(true)
	const colorScheme = useColorScheme()
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
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				{isAuthenticated ? (
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				) : (
					<Stack.Screen name='auth' options={{ headerShown: false }} />
				)}

				<Stack.Screen name='+not-found' />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	)
}
