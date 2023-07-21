import { makeAutoObservable } from 'mobx'
import { Theme, ThemeState } from '../theme'

class Store {
	isPageLoading = false
	isBackdropVisible = false

	constructor () {
		makeAutoObservable(this)
	}

	setIsPageLoading (value: boolean) {
		this.isPageLoading = value
	}

	setIsBackdropVisible (value: boolean) {
		this.isBackdropVisible = value
	}
}

export const store = new Store