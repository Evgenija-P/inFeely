import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import {
  CalendarActiveIcon,
  CalendarIcon,
  HomeIcon,
  HomeIconActive,
  InsightsIcon,
  TimerIcon,
} from '@/assets/images/icons/icons';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabIconSelected, // видимий колір
        // tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            height: 112,
            backgroundColor: Colors.light.background,
            opacity: 0.8,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 0,
            elevation: 10, // для Android тінь
            shadowColor: '#000', // для iOS тінь
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -5 },
            shadowRadius: 10,
            paddingTop: 29,
            paddingBottom: 29,
            paddingLeft: 24,
            paddingRight: 24,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (focused ? <HomeIconActive /> : <HomeIcon />),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => (focused ? <CalendarActiveIcon /> : <CalendarIcon />),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          tabBarIcon: ({ focused }) => <TimerIcon isActive={focused} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused }) => <InsightsIcon isActive={focused} />,
        }}
      />
    </Tabs>
  );
}
