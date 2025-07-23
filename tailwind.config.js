/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: [
		// для файлів з expo-router
		'./app/**/*.{js,jsx,ts,tsx}',
		// якщо компоненти окремо
		'./components/**/*.{js,jsx,ts,tsx}',
		// якщо раптом ще щось поза цими папками
		'./**/*.{js,jsx,ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: '#000000',
				secondary: '#F3F3F3',
				text: '#000000',
				background: '#F3F3F3',
				accent: '#6E7556',
				placeholder: '#fff',
				error: '#D10D10',
				tint: '#6E7556',
				icon: '#252622',
				tabIconDefault: '#252622',
				tabIconSelected: '#252622',
				ellipse_lite: '#D9D9D9',
				ellipse: '#8A8A8A',
				ellipse_dark: '#252622',
				ellipse_red: '#E47375',
				ellipse_pink: '#FAB2B7',
				ellipse_yellow: '#F5CD9F',
				ellipse_green: '#90AA8B',
				ellipse_dark_green: '#6E7556'
			}
		},
		plugins: []
	}
}
