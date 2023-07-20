import { makeAutoObservable } from 'mobx'
import { Theme, ThemeState } from '../theme'

class Store {
	theme = Theme.CreateTheme()
	darkTheme = false
	isPageLoading = false
	isBackdropVisible = false

	constructor () {
		makeAutoObservable(this)
	}

	setTheme (theme: ThemeState) {
		this.theme = theme
	}

	switchTheme () {
		if (typeof window !== 'undefined') {
			if (!this.darkTheme) {
				this.darkTheme = true
				localStorage.setItem('darkTheme', 'true')
				document.getElementById('root').innerText = this.theme.root.dark
			} else if (this.darkTheme) {
				this.darkTheme = false
				localStorage.setItem('darkTheme', 'false')
				document.getElementById('root').innerText = this.theme.root.light
			}
		}
	}

	setIsPageLoading (value: boolean) {
		this.isPageLoading = value
	}

	setIsBackdropVisible (value: boolean) {
		this.isBackdropVisible = value
	}
}

export const store = new Store