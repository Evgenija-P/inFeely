import { Arrow } from 'assets/images/icons/icons'

import BaseLink from './ui/BaseLink'

import { LinkProps } from 'expo-router'

const ArrowBack = ({ href }: LinkProps) => {
	return (
		<BaseLink
			href={typeof href === 'string' ? href : (href.pathname ?? '')}
			type='custom'
			icon={<Arrow />}
			className='w-[18px] h-[18px] flex items-center justify-start'
		/>
	)
}

export default ArrowBack
