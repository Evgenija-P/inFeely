export interface IAuthFormData extends Record<string, string> {
	email: string
	password: string
}

export interface IAuthResponse {
	token: string
}

export interface IAuthError {
	message: string
}

export interface IAuthState {
	token: string
}

export interface IAuthContext {
	token: string
	setToken: (token: string) => void
}

export interface IAuthContextProviderProps {
	children: React.ReactNode
}

export interface IAuthContextProvider {
	token: string
	setToken: (token: string) => void
}

export interface IAuthContextProviderValue {
	token: string
	setToken: (token: string) => void
}
