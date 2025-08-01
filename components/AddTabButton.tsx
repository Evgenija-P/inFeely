import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'

import { Add } from 'assets/images/icons/icons'

import { Pressable, StyleSheet, View } from 'react-native'

export default function AddTabButton(props: BottomTabBarButtonProps) {
	return (
		<View style={styles.wrapper}>
			<Pressable
				style={styles.button}
				onPress={props.onPress}
				accessibilityLabel={props.accessibilityLabel}
				testID={props.testID}
			>
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
