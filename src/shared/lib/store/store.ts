import { makeAutoObservable } from 'mobx'

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