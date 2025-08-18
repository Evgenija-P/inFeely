import {
	Add,
	CalendarActiveIcon,
	CalendarIcon,
	HomeIcon,
	HomeIconActive,
	InsightsActiveIcon,
	InsightsIcon,
	TimerActiveIcon,
	TimerIcon
} from 'assets/images/icons/icons'

import { Colors } from 'constants/Colors'
import { Tabs, useRouter, useSegments } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function TabLayout() {
	const router = useRouter()
	// const segments = useSegments()
	// const activeRoute = segments[segments.length - 1]
	const segments = useSegments()
	const activeRoute = segments[segments.length - 1]
	const isShowTabs = activeRoute !== 'add'

	const goTo = (name: string) => {
		router.push(name)
	}

	return (
		<View style={{ flex: 1 }}>
			{/* Tabs для навігації, без стандартного TabBar */}
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: { display: 'none' } // ховаємо стандартний TabBar
				}}
			>
				<Tabs.Screen name='index' />
				<Tabs.Screen name='calendar' />
				<Tabs.Screen name='add' />
				<Tabs.Screen name='timer' />
				<Tabs.Screen name='insights' />
			</Tabs>

			{/* Кастомний TabBar */}
			{isShowTabs && (
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						height: 112,
						flexDirection: 'row',
						justifyContent: 'space-between', // рівномірно розкидає кнопки
						alignItems: 'center',
						backgroundColor: Colors.light.background,

						paddingHorizontal: 16,

						zIndex: 10
					}}
				>
					<TouchableOpacity onPress={() => goTo('/')} style={[styles.button]}>
						<View style={styles.iconsWrapper}>
							{activeRoute === '(tabs)' ? <HomeIconActive /> : <HomeIcon />}
						</View>
						<Text
							style={[
								styles.text,
								activeRoute === '(tabs)' ? { opacity: 1 } : { opacity: 0.4 }
							]}
						>
							Home
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => goTo('/calendar')} style={[styles.button]}>
						<View style={styles.iconsWrapper}>
							{activeRoute === 'calendar' ? <CalendarActiveIcon /> : <CalendarIcon />}
						</View>
						<Text
							style={[
								styles.text,
								activeRoute === 'calendar' ? { opacity: 1 } : { opacity: 0.4 }
							]}
						>
							Calendar
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => goTo('/add')}>
						<Add />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => goTo('/timer')} style={[styles.button]}>
						<View style={styles.iconsWrapper}>
							{activeRoute === 'timer' ? <TimerActiveIcon /> : <TimerIcon />}
						</View>
						<Text
							style={[
								styles.text,
								activeRoute === 'timer' ? { opacity: 1 } : { opacity: 0.4 }
							]}
						>
							Timer
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => goTo('/insights')} style={[styles.button]}>
						<View style={styles.iconsWrapper}>
							{activeRoute === 'insights' ? <InsightsActiveIcon /> : <InsightsIcon />}
						</View>
						<Text
							style={[
								styles.text,
								activeRoute === 'insights' ? { opacity: 1 } : { opacity: 0.4 }
							]}
						>
							Insights
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	iconsWrapper: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: Colors.light.main
	},
	button: { alignItems: 'center', justifyContent: 'center', height: 54 }
})
