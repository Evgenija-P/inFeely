import { ThemedText } from './ThemedText'
import { BulletItem, BulletList } from './ui/BulletListItem'
import BaseTextAreaInput from './ui/form/BaseTextAreaInput'

import { Colors } from 'constants/Colors'
import { useMealContext } from 'contexts/MealContext'
import { Text, View } from 'react-native'

const DescribeMeal = () => {
	const { state, setField } = useMealContext()

	return (
		<View style={{ gap: 8 }}>
			<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
				Describe your meal in a few words
			</ThemedText>
			<BaseTextAreaInput
				heightValue={70}
				numberOfLines={1}
				placeholder='ex: pasta with veggies and parmesan'
				onChangeText={text => setField('description', text)}
				value={state.description || ''}
			/>

			<View style={{ gap: 2, paddingLeft: 4 }}>
				<Text
					style={{ fontSize: 14, lineHeight: 22, color: Colors.light.main, opacity: 0.5 }}
				>
					optional:
				</Text>

				<BulletList gap={0}>
					<BulletItem>texture — was it soft, crunchy, creamy?</BulletItem>
					<BulletItem>temperature — was it warm, cold, room temp?</BulletItem>
					<BulletItem>portion — was it small, medium, large?</BulletItem>
				</BulletList>
			</View>
		</View>
	)
}

export default DescribeMeal
