import { makeRedirectUri } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export const discovery = {
	authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
	tokenEndpoint: 'https://oauth2.googleapis.com/token',
	userInfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo'
}

if (!process.env.APP_GOOGLE_CLIENT_ID) {
	throw new Error('APP_GOOGLE_CLIENT_ID is not defined')
}

export const googleAuthConfig = {
	clientId: process.env.APP_GOOGLE_CLIENT_ID,
	redirectUri: makeRedirectUri({ scheme: 'infeely' }),
	scopes: ['openid', 'profile', 'email'],
	responseType: 'code', // для PKCE
	usePKCE: true
}
