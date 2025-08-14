import { ReactNode, createContext, useContext, useState } from 'react'

export interface User {
	_id: string
	email: string
	name?: string
	goal?: string
	period?: number[]
	avatarUrl?: string
	authProviders?: ('password' | 'google' | 'apple')[]
	isFirstRender: boolean
	createdAt?: string
	updatedAt?: string
}

interface AuthContextType {
	user: User | null
	token: string | null
	login: (user: User, token: string) => void
	logout: () => void
	updateUser: (newData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)

	const login = (userData: User, jwt: string) => {
		setUser(userData)
		setToken(jwt)
	}

	const logout = () => {
		setUser(null)
		setToken(null)
	}

	const updateUser = (newData: Partial<User>) => {
		setUser(prev => (prev ? { ...prev, ...newData } : prev))
	}

	return (
		<AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
