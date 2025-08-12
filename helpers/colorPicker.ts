import { Colors } from 'constants/Colors'

export const colorPicker = (point?: number) => {
	if (typeof point !== 'number') return undefined

	if (point > 0 && point < 20) {
		return Colors.light.ellipse_red
	} else if (point >= 20 && point < 40) {
		return Colors.light.ellipse_pink
	} else if (point >= 40 && point < 60) {
		return Colors.light.ellipse_yellow
	} else if (point >= 60 && point < 80) {
		return Colors.light.ellipse_green
	} else if (point >= 80 && point <= 100) {
		return Colors.light.ellipse_dark_green
	}
	return undefined
}
