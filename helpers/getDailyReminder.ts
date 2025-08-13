export const getDailyReminder = (): string => {
	const reminders = [
		'✨ Notice how you feel before eating — not just what you eat',
		'🥦 Your veggies called… they miss you!',
		'💧 Sip some water — your brain loves it too',
		'🍽 Slow down, your stomach can’t read ‘fast food’',
		'🍏 A snack is a hug you give yourself (choose wisely 😉)',
		'🌿 Green stuff on the plate? Your body says thank you',
		'🛑 Check your hunger level — maybe you just need a stretch',
		'🍊 Vitamin C is like sunshine in disguise',
		'🍫 Treats are okay… just don’t let them stage a coup',
		'🧘 Breathe. Even your lunch appreciates it'
	]

	const randomIndex = Math.floor(Math.random() * reminders.length)
	return `\n${reminders[randomIndex]}`
}
