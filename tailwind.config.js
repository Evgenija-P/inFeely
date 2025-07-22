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
		extend: {}
	},
	plugins: []
}
