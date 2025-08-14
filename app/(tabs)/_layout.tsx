import AddTabButton from 'components/AddTabButton'

import {
	CalendarActiveIcon,
	CalendarIcon,
	HomeIcon,
	HomeIconActive,
	InsightsIcon,
	TimerIcon
} from 'assets/images/icons/icons'

import { Colors } from 'constants/Colors'
import { Tabs, useRouter, useSegments } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

export default function TabLayout() {
	const router = useRouter()
	const segments = useSegments()
	const activeRoute = segments[segments.length - 1] // останній сегмент = активний таб

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
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					width: '100%',
					height: 112,
					flexDirection: 'row',
					justifyContent: 'space-around', // рівномірно розкидає кнопки
					alignItems: 'center',
					backgroundColor: Colors.light.background,
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24,
					paddingHorizontal: 16,
					paddingVertical: 16,
					zIndex: 10,
					shadowColor: '#000',
					shadowOpacity: 0.1,
					shadowRadius: 10,
					shadowOffset: { width: 0, height: -2 },
					elevation: 5 // для тіні на Android
				}}
			>
				<TouchableOpacity onPress={() => goTo('/index')}>
					{activeRoute === 'index' ? <HomeIconActive /> : <HomeIcon />}
				</TouchableOpacity>

				<TouchableOpacity onPress={() => goTo('/calendar')}>
					{activeRoute === 'calendar' ? <CalendarActiveIcon /> : <CalendarIcon />}
				</TouchableOpacity>

				<AddTabButton />

				<TouchableOpacity onPress={() => goTo('/timer')}>
					<TimerIcon isActive={activeRoute === 'timer'} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => goTo('/insights')}>
					<InsightsIcon isActive={activeRoute === 'insights'} />
				</TouchableOpacity>
			</View>
		</View>
	)
}
