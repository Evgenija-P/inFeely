import ArrowBack from './ArrowBack'

import { View } from 'react-native'

const Header = ({ children, style }: { children: React.ReactNode; style?: any }) => {
	return (
		<View className={`w-full flex flex-row items-center justify-between shrink ${style}`}>
			{/* Кнопка назад */}
			<View className='w-1/3'>
				<ArrowBack href='/' />
			</View>

			{children}

			<View className='w-1/3 ' />
		</View>
	)
}

export default Header
