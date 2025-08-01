import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

type Props = {
	isAuthenticated?: boolean
	isFirstRender?: boolean
	children: React.ReactNode
}

export default function ProtectedRoute({ isAuthenticated, isFirstRender, children }: Props) {
	const router = useRouter()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return

		if (isFirstRender) {
			router.replace('/start_page')
			return
		}

		if (!isFirstRender && !isAuthenticated) {
			router.replace('/sing_in')
		}
	}, [isAuthenticated, isFirstRender, mounted, router])

	if (!mounted) return null

	return <>{children}</>
}
