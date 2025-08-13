import { MealComponentProps } from './MealComponent'
import { ThemedText } from './ThemedText'
import BaseTextAreaInput from './ui/form/BaseTextAreaInput'

import { useMealContext } from 'contexts/MealContext'
import { View } from 'react-native'

const NoteInput = ({ chapterType }: MealComponentProps) => {
	const { state, setField } = useMealContext()

	const onChangeText = (value: string) => {
		if (chapterType === 'before') {
			setField('noteBefore', value)
		} else {
			setField('noteAfter', value)
		}
	}

	return (
		<View style={{ width: '100%' }}>
			<View style={{ gap: 8 }}>
				<ThemedText type='defaultMedium' style={{ textAlign: 'center' }}>
					Any thoughts you want to note?
				</ThemedText>
				<BaseTextAreaInput
					heightValue={70}
					numberOfLines={1}
					placeholder={
						chapterType === 'before'
							? 'Enter a short noteBefore about your feelings'
							: ':)'
					}
					onChangeText={text => onChangeText(text)}
					value={chapterType === 'before' ? state.noteBefore : state.noteAfter || ''}
				/>
			</View>
		</View>
	)
}

export default NoteInput
