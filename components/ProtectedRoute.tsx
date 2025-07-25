import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

type Props = {
	isAuthenticated?: string
	isFirstRender?: string
	children: React.ReactNode
}

export default function ProtectedRoute({ isAuthenticated, isFirstRender, children }: Props) {
	const router = useRouter()
	const [mounted, setMounted] = useState(false)

	console.log('isAuthenticated', isAuthenticated)
	console.log('isFirstRender', isFirstRender)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return

		if (isFirstRender === 'true') {
			router.replace('/start_page')
			return
		}

		if (isFirstRender === 'false' && isAuthenticated === 'false') {
			router.replace('/sing_in')
		}
	}, [isAuthenticated, isFirstRender, mounted, router])

	if (!mounted) return null

	return <>{children}</>
}
