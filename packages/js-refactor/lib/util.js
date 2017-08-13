'use babel'

export function locator(text) {
	const nl = /\r\n|\n|\r/g
	const loc = [0]
	while (nl.exec(text)) {
		loc.push(nl.lastIndex)
	}
	return (row, col) => loc[row] + col
}
