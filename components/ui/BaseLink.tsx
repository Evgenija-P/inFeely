import { Link, LinkProps } from 'expo-router'
import { StyleSheet } from 'react-native'

export type BaseLinkProps = LinkProps & {
	href: string
	text?: string
	className?: string
	icon?: React.ReactNode
	type: 'default' | 'custom' | 'external'
}

const BaseLink = ({ href, text, className, icon, type }: BaseLinkProps) => {
	return (
		<Link
			href={href}
			className={className}
			style={[
				type === 'default' ? styles.default : undefined,
				type === 'custom' ? styles.custom : undefined,
				type === 'external' ? styles.external : undefined
			]}
		>
			{icon}
			{text}
		</Link>
	)
}

export default BaseLink

const styles = StyleSheet.create({
	default: {
		fontFamily: 'OnestMedium',
		fontSize: 18
	},
	custom: {
		fontFamily: 'OnestMedium'
	},
	external: {
		fontFamily: 'OnestSemiBold'
	}
})
