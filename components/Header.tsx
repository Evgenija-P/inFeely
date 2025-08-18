import ArrowBack from './ArrowBack'

import { View } from 'react-native'

const Header = ({ children, style }: { children: React.ReactNode; style?: any }) => {
	return (
		<View
			// className={`w-full flex flex-row items-center justify-between shrink ${style}`}
			style={[
				{
					// flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%'
				},
				style
			]}
		>
			{/* Кнопка назад */}
			<View style={{ width: '33%' }}>
				<ArrowBack href='/' />
			</View>

			{children}

			<View style={{ width: '33%' }} />
		</View>
	)
}

export default Header
