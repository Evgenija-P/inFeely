import ArrowBack from 'components/ArrowBack'
import { ThemedText } from 'components/ThemedText'

import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SingUpScreen = () => {
	return (
		<SafeAreaView
			style={{ flex: 1, paddingTop: 24, paddingBottom: 24, justifyContent: 'space-between' }}
		>
			<View className='w-full flex flex-row items-center justify-between shrink mb-12'>
				{/* Кнопка назад */}
				<View className='w-1/3'>
					<ArrowBack href='/' />
				</View>

				<View className='w-1/3 flex flex-row items-center justify-center'>
					<Image
						source={require('../assets/images/Logo.svg')}
						className='w-[157px] h-[56px]'
					/>
				</View>
				<View className='w-1/3 ' />
			</View>

			<View className='w-full h-full flex flex-col items-center justify-center bg-background px-6 pt-[144px] pb-6'>
				<ThemedText className='text-primary text-center mb-8' type='title'>
					This is SingUp Screen
				</ThemedText>
			</View>
		</SafeAreaView>
	)
}

export default SingUpScreen
