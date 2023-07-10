import { ThemeRoot, ThemeVariables } from 'shared/types'

export const createThemeRoot = (themeVariables: ThemeVariables) => {
	const themeRoot: ThemeRoot = {
		scheme: {
			light: themeVariables.schemes.light.join(' '),
			dark: themeVariables.schemes.dark.join(' ')
		},
		typography: themeVariables.typography.join(' '),
		elevations: themeVariables.elevations.join(' ')
	}

	return themeRoot
}