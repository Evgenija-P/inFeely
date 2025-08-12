export const textPicker = (textsArray: [{ title: string; text: [string] }][], point: number) => {
	const texts = textsArray || undefined
	if (typeof point !== 'number' || !texts) return undefined
	if (point < 0 || point > 100) return undefined

	if (point > 0 && point < 10) {
		return texts[1]
	} else if (point >= 10 && point < 20) {
		return texts[2]
	} else if (point >= 20 && point < 30) {
		return texts[3]
	} else if (point >= 30 && point < 40) {
		return texts[4]
	} else if (point >= 40 && point < 50) {
		return texts[5]
	} else if (point >= 50 && point < 60) {
		return texts[6]
	} else if (point >= 60 && point < 70) {
		return texts[7]
	} else if (point >= 70 && point < 80) {
		return texts[8]
	} else if (point >= 80 && point < 90) {
		return texts[9]
	} else if (point >= 90 && point <= 100) {
		return texts[10]
	}
	return texts[0]
}
