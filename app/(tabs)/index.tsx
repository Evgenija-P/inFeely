import { Text, View } from 'react-native'

export default function HomeScreen() {
	// const [isEmpty, setIsEmpty] = useState(true)
	// const [isAuthenticated, setIsAuthenticated] = useState(true)
	// const [isFirstRender, setIsFirstRender] = useState(false)
	// const { token, user } = useAuth()

	// useEffect(() => {
	// 	if (user && user._id && token) {
	// 		setIsAuthenticated(true)
	// 		setIsFirstRender(user.isFirstRender)
	// 	}
	// }, [user, token])

	return (
		// <ProtectedRoute isFirstRender={isFirstRender} isAuthenticated={isAuthenticated}>
		// 	<SafeAreaView
		// 		style={{
		// 			flex: 1,
		// 			justifyContent: 'flex-start',
		// 			paddingTop: 24,
		// 			paddingBottom: 24
		// 		}}
		// 	>
		// 		{/* верхній блок, вітання + аватар */}
		// 		<View className='flex flex-row items-center justify-between shrink gap-x-[42px] mb-4'>
		// 			<View className='flex gap-y-2'>
		// 				<ThemedText type='title' className='text-primary'>
		// 					{getGreetingWithName('Username')}🍃
		// 					{/* Good morning, Username  */}
		// 				</ThemedText>
		// 				<ThemedText
		// 					type='default'
		// 					className='text-ellipse_dark'
		// 					style={{ opacity: 0.5 }}
		// 				>
		// 					How’s the wind blowing today?
		// 				</ThemedText>
		// 			</View>
		// 			<View className='w-12 h-12 rounded-full flex items-center justify-center bg-white'>
		// 				<Avatar />
		// 			</View>
		// 		</View>

		// 		{/* середній блок, календар */}

		// 		<View className='mb-6 min-h-24'>
		// 			<WeekCalendar />
		// 		</View>

		// 		{/* блок з прийомами їжі чи заглушка */}

		// 		<View className='flex gap-4 w-full h-fit'>
		// 			{isEmpty ? (
		// 				<View className='flex gap-4 w-full h-fit rounded-3xl bg-white p-8'>
		// 					<View className='flex-1 justify-center items-center gap-2'>
		// 						<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
		// 							Ready to listen to yourself?
		// 						</ThemedText>
		// 						<ThemedText
		// 							type='default'
		// 							className='text-sm text-center text-ellipse_dark'
		// 							style={{ opacity: 0.5 }}
		// 						>
		// 							Start by adding your first feeling
		// 						</ThemedText>
		// 					</View>
		// 					<BaseLink
		// 						href='/add'
		// 						text='Begin Now'
		// 						type='custom'
		// 						className='w-fit mx-auto text-sm text-white uppercase px-8 py-[14px] rounded-full bg-primary flex items-center justify-center'
		// 					/>
		// 				</View>
		// 			) : (
		// 				<View className='flex gap-4 w-full h-fit rounded-3xl bg-white p-8'>
		// 					<View className='flex-1 justify-center items-center gap-2'>
		// 						<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
		// 							Ready to listen to yourself?
		// 						</ThemedText>
		// 						<ThemedText
		// 							type='default'
		// 							className='text-sm text-center text-ellipse_dark'
		// 							style={{ opacity: 0.5 }}
		// 						>
		// 							Start by adding your first feeling
		// 						</ThemedText>
		// 					</View>
		// 					<BaseLink
		// 						href='/add'
		// 						text='Begin Now'
		// 						type='custom'
		// 						className='w-fit mx-auto text-sm text-white uppercase px-8 py-[14px] rounded-full bg-primary flex items-center justify-center'
		// 					/>
		// 				</View>
		// 			)}

		// 			{/* Reminder */}

		// 			<Reminder />
		// 		</View>
		// 	</SafeAreaView>
		// </ProtectedRoute>
		<View>
			<Text style={{ textAlign: 'center' }}>Ready to listen to yourself?</Text>
			<Text style={{ opacity: 0.5 }}>Start by adding your first feeling</Text>
		</View>
	)
}
