export const kebabize = (string: string) => {
	const regExp = /[A-Z]+(?![a-z])|[A-Z]/g
	const kebabString = string.replace(regExp, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

	return kebabString
}