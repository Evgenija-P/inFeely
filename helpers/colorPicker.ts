import { Colors } from 'constants/Colors'

const ranges = [
	{ min: 1, max: 10, color: Colors.light.ellipse_red, index: 1 },
	{ min: 10, max: 20, color: Colors.light.ellipse_red, index: 2 },
	{ min: 20, max: 30, color: Colors.light.ellipse_pink, index: 3 },
	{ min: 30, max: 40, color: Colors.light.ellipse_pink, index: 4 },
	{ min: 40, max: 50, color: Colors.light.ellipse_yellow, index: 5 },
	{ min: 50, max: 60, color: Colors.light.ellipse_yellow, index: 6 },
	{ min: 60, max: 70, color: Colors.light.ellipse_green, index: 7 },
	{ min: 70, max: 80, color: Colors.light.ellipse_green, index: 8 },
	{ min: 80, max: 90, color: Colors.light.ellipse_dark_green, index: 9 },
	{ min: 90, max: 101, color: Colors.light.ellipse_dark_green, index: 10 }
]

export const valuePicker = (point?: number) => {
	if (typeof point !== 'number' || point < 0 || point > 100) return undefined
	const range = ranges.find(r => point >= r.min && point < r.max)
	return range?.color
}
