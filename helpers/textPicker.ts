const ranges = [
	{ min: 1, max: 10, index: 1 },
	{ min: 10, max: 20, index: 2 },
	{ min: 20, max: 30, index: 3 },
	{ min: 30, max: 40, index: 4 },
	{ min: 40, max: 50, index: 5 },
	{ min: 50, max: 60, index: 6 },
	{ min: 60, max: 70, index: 7 },
	{ min: 70, max: 80, index: 8 },
	{ min: 80, max: 90, index: 9 },
	{ min: 90, max: 101, index: 10 }
]

export const getTextByValue = (point: number, textValues: { title: string; text: string[] }[]) => {
	if (typeof point !== 'number' || point < 0 || point > 100) return undefined
	const range = ranges.find(r => point >= r.min && point < r.max)
	if (!range) return textValues[0]

	if (range.index === undefined) return textValues[0]
	if (range.index >= textValues.length) return textValues[textValues.length - 1]
	return textValues[range.index] || textValues[0]
}
