import { ThemedText } from './ThemedText'

import { View } from 'react-native'

const Reminder = () => {
	return (
		<View className='flex gap-4 w-full h-fit rounded-3xl bg-white p-8'>
			<View className='flex-1 justify-center items-center gap-2'>
				<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
					Daily reminder ✨
				</ThemedText>
				<ThemedText type='default' className='text-sm text-center text-ellipse_dark'>
					Notice how you feel before eating — not just what you eat
				</ThemedText>
			</View>
		</View>
	)
}

export default Reminder
