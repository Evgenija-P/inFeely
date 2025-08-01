// import { useColorScheme } from 'hooks/useColorScheme';
import AddTabButton from 'components/AddTabButton'
import { HapticTab } from 'components/HapticTab'
import TabBarBackground from 'components/ui/TabBarBackground'

import {
	CalendarActiveIcon,
	CalendarIcon,
	HomeIcon,
	HomeIconActive,
	InsightsIcon,
	TimerIcon
} from 'assets/images/icons/icons'

import { Colors } from 'constants/Colors'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
	// const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.tabIconSelected, // видимий колір
				// tabBarInactiveTintColor: 'gray',
				tabBarLabelStyle: {
					fontSize: 14,
					fontWeight: '500'
				},
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute'
					},
					default: {
						height: 112,
						backgroundColor: Colors.light.background,
						// opacity: 0.8,
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						borderTopWidth: 0,

						paddingHorizontal: 8,
						paddingVertical: 16,

						display: 'flex',
						flexDirection: 'row',

						alignItems: 'center',
						justifyContent: 'space-between'
					}
				})
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ focused }) => (focused ? <HomeIconActive /> : <HomeIcon />)
				}}
			/>
			<Tabs.Screen
				name='calendar'
				options={{
					title: 'Calendar',
					tabBarIcon: ({ focused }) =>
						focused ? <CalendarActiveIcon /> : <CalendarIcon />
				}}
			/>
			<Tabs.Screen
				name='add'
				options={{
					title: 'Add',
					tabBarLabel: '',
					tabBarIcon: () => null,
					tabBarButton: props => <AddTabButton {...props} />
				}}
			/>
			<Tabs.Screen
				name='timer'
				options={{
					title: 'Timer',
					tabBarIcon: ({ focused }) => <TimerIcon isActive={focused} />
				}}
			/>
			<Tabs.Screen
				name='insights'
				options={{
					title: 'Insights',
					tabBarIcon: ({ focused }) => <InsightsIcon isActive={focused} />
				}}
			/>
		</Tabs>
	)
}
