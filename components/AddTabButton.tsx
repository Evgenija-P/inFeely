import { Add } from 'assets/images/icons/icons'

import { router } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

export default function AddTabButton() {
	return (
		<View style={styles.wrapper}>
			<Pressable style={styles.button} onPress={() => router.push('/add')}>
				<Add />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		top: -8,
		left: '50%',
		transform: [{ translateX: -32 }],
		width: 64,
		height: 64,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	}
})
