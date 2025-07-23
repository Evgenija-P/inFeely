import { Colors } from 'constants/Colors'
import { StyleSheet, View } from 'react-native'

const Footer = () => {
	return (
		<View style={styles.footer}>
			<View style={styles.footer_item} />
		</View>
	)
}

export default Footer

const styles = StyleSheet.create({
	footer: {
		width: '100%',
		height: 24,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	footer_item: {
		width: 140,
		height: 5,
		borderRadius: 100,
		backgroundColor: Colors.light.tabIconDefault
	}
})
