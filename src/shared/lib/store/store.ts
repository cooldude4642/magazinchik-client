import { makeAutoObservable } from 'mobx'
import { Theme, ThemeRoot, ThemeVariables } from 'shared/types'
import { createTheme, createThemeRoot, createThemeVariables } from '../theme'

class Store {
	theme = createTheme({})
	themeVariables = createThemeVariables(this.theme)
	themeRoot = createThemeRoot(this.themeVariables)
	darkTheme = false

	constructor () {
		makeAutoObservable(this)
	}

	setTheme (theme: Theme) {
		this.theme = theme
	}

	setThemeVariables (themeVariables: ThemeVariables) {
		this.themeVariables = themeVariables
	}

	setThemeRoot (themeRoot: ThemeRoot) {
		this.themeRoot = themeRoot
	}

	switchTheme () {
		this.darkTheme = this.darkTheme ? false : true
		const scheme = this.darkTheme ? this.themeRoot.scheme.dark : this.themeRoot.scheme.light
		const { typography, elevations } = this.themeRoot

		document.getElementById('root').innerText = `:root { ${ scheme } ${ typography } ${ elevations } }`
	}
}

export const store = new Store