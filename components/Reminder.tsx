import { ThemedText } from './ThemedText'

import { Colors } from 'constants/Colors'
import { getDailyReminder } from 'helpers/getDailyReminder'
import { StyleSheet, View } from 'react-native'

const Reminder = () => {
	return (
		<View style={styles.container}>
			<ThemedText type='defaultSemiBold' style={{ textAlign: 'center' }}>
				Daily reminder ✨
			</ThemedText>
			<ThemedText type='default' className='text-sm text-center text-ellipse_dark'>
				{getDailyReminder()}
			</ThemedText>
		</View>
	)
}

export default Reminder

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		// gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.light.placeholder,
		paddingVertical: 32,
		paddingHorizontal: 16,
		borderRadius: 24
	}
})
