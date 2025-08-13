import { Colors } from 'constants/Colors'
import React from 'react'
import { Text, TextProps, View, ViewProps } from 'react-native'

type BulletListProps = ViewProps & {
	children: React.ReactNode
	gap?: number
	bulletSize?: number
	bullet?: string // наприклад "•", "–", "◦"
}

export const BulletList = ({
	children,
	gap = 2,
	bulletSize = 6,
	style,
	...rest
}: BulletListProps) => {
	return (
		<View accessibilityRole='list' style={[{ width: '100%', gap }, style]} {...rest}>
			{children}
		</View>
	)
}

type BulletItemProps = TextProps & {
	children: React.ReactNode
	bullet?: string
	bulletColor?: string
	bulletOffsetTop?: number
}

export const BulletItem = ({
	children,
	bullet = '•',
	bulletColor = Colors.light.main,
	bulletOffsetTop = 6,
	style,
	...rest
}: BulletItemProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 2
			}}
		>
			{/* Маркер */}
			<View
				style={{
					alignItems: 'center'
				}}
			>
				<Text style={{ color: bulletColor, opacity: 0.5 }}>{bullet}</Text>
			</View>

			{/* Текст пункту (підтримує перенос на нові рядки) */}
			<Text
				style={[
					{
						flex: 1,
						fontSize: 14,
						lineHeight: 22,
						fontFamily: 'OnestRegular',
						color: Colors.light.main,
						opacity: 0.5
					},
					// @ts-ignore — дозволяємо кастомні стилі зверху
					style
				]}
				{...rest}
			>
				{children}
			</Text>
		</View>
	)
}
