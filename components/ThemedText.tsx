import { StyleSheet, Text, type TextProps } from 'react-native'

export type ThemedTextProps = TextProps & {
	type?: 'default' | 'defaultMedium' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
	className?: string
}

export function ThemedText({ style, type = 'default', className, ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				type === 'default' ? styles.default : undefined,
				type === 'defaultMedium' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				style
			]}
			{...rest}
			className={className}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 22,
		fontFamily: 'OnestRegular'
	},
	defaultMedium: {
		fontSize: 16,
		lineHeight: 22,
		fontWeight: '500',
		fontFamily: 'OnestMedium'
	},
	defaultSemiBold: {
		fontSize: 18,
		lineHeight: 22,
		fontWeight: '600',
		fontFamily: 'OnestSemiBold'
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		fontFamily: 'OnestSemiBold',
		lineHeight: 22
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4'
	}
})
