import { makeAutoObservable } from 'mobx'
import { Theme } from '../theme'

class Store {
	theme = new Theme({})
	darkTheme = false

	constructor () {
		makeAutoObservable(this)
	}

	setTheme (theme: Theme) {
		this.theme = theme
	}

	switchTheme () {
		if (typeof window !== 'undefined') {
			if (!this.darkTheme) {
				this.darkTheme = true
				document.getElementById('root').innerText = this.theme.root.dark
			} else if (this.darkTheme) {
				this.darkTheme = false
				document.getElementById('root').innerText = this.theme.root.light
			}
		}
	}
}

export const store = new Store