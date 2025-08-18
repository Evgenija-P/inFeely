import Reminder from 'components/Reminder'
import { ThemedText } from 'components/ThemedText'
import WeekCalendar from 'components/WeekCalendar'
import BaseLink from 'components/ui/BaseLink'

import { Avatar } from 'assets/images/icons/icons'

import { Colors } from 'constants/Colors'
import { useAuth } from 'contexts/AuthContext'
import { getGreetingWithName } from 'helpers/getGreeting'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
	const [isEmpty, setIsEmpty] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(true)
	const [isFirstRender, setIsFirstRender] = useState(false)
	const { token, user } = useAuth()

	useEffect(() => {
		if (user && user._id && token) {
			setIsAuthenticated(true)
			setIsFirstRender(user.isFirstRender)
		}
	}, [user, token])

	return (
		<SafeAreaView
			style={{
				// display: 'flex',
				flex: 1,
				justifyContent: 'flex-start',
				paddingTop: 30,
				paddingBottom: 24
			}}
		>
			{/* верхній блок, вітання + аватар */}
			<ScrollView contentContainerStyle={{ gap: 24 }}>
				<View style={styles.userInfoContainer}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8
							// flex: 1
						}}
					>
						<ThemedText type='title' style={{ color: Colors.light.text }}>
							{getGreetingWithName('User')}🍃
							{/* Good morning, Username  */}
						</ThemedText>
						<ThemedText
							type='default'
							style={{ opacity: 0.5, color: Colors.light.text }}
						>
							How’s the wind blowing today?
						</ThemedText>
					</View>
					<View style={styles.avatarContainer}>
						<Avatar />
					</View>
				</View>

				{/* середній блок, календар */}

				<View style={{ marginBottom: 24, minHeight: 96 }}>
					<WeekCalendar />
				</View>

				{/* блок з прийомами їжі чи заглушка */}

				<View style={{ gap: 16, width: '100%' }}>
					{isEmpty ? (
						<View style={styles.wrapper}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									gap: 8
								}}
							>
								<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
									Ready to listen to yourself?
								</ThemedText>
								<ThemedText
									type='base'
									style={{
										opacity: 0.5,
										textAlign: 'center'
									}}
								>
									Start by adding your first feeling
								</ThemedText>
							</View>
							<BaseLink
								href='/add'
								text='Begin Now'
								type='custom'
								style={styles.button}
							/>
						</View>
					) : (
						<View style={styles.wrapper}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									gap: 8
								}}
							>
								<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
									Ready to listen to yourself?
								</ThemedText>
								<ThemedText
									type='base'
									style={{
										opacity: 0.5,
										textAlign: 'center'
									}}
								>
									Start by adding your first feeling
								</ThemedText>
							</View>
							<BaseLink
								href='/add'
								text='Begin Now'
								type='custom'
								style={styles.button}
							/>
						</View>
					)}

					{/* Reminder */}

					<Reminder />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	userInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 24,
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 24,
		marginBottom: 16
	},
	avatarContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.placeholder,
		overflow: 'hidden'
	},
	wrapper: {
		gap: 16,
		width: '100%',
		borderRadius: 24,
		backgroundColor: Colors.light.placeholder,
		padding: 24
	},
	button: {
		color: Colors.light.placeholder,
		width: 'auto',
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto',
		paddingHorizontal: 32,
		paddingVertical: 14,
		borderRadius: 24,
		backgroundColor: Colors.light.main,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
