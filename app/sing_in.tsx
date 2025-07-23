import { ThemedText } from 'components/ThemedText'

import { View } from 'react-native'

const SingInScreen = () => {
	return (
		<View className='w-full h-full flex flex-col items-center justify-center bg-background px-6 pt-[144px] pb-6'>
			<ThemedText className='text-primary text-center' type='default'>
				This is sing in page!
			</ThemedText>
		</View>
	)
}

export default SingInScreen
