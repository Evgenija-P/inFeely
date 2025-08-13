import { StyleSheet, View, ViewProps } from 'react-native'

export type BaseWrapperProps = ViewProps & {
	children: React.ReactNode
}

const BaseWrapper = ({ children, style }: BaseWrapperProps) => {
	return <View style={[styles.wrapper, style]}>{children}</View>
}

export default BaseWrapper

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		borderRadius: 24,
		backgroundColor: '#fff',
		padding: 16,
		display: 'flex',
		gap: 16
	}
})
