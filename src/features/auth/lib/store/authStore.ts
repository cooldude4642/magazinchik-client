import { makeAutoObservable } from 'mobx'

class AuthStore {
	isAuthModalWindowVisble = false
	isLoginWindowVisible = true
	isRegisterWindowVisible = false

	constructor () {
		makeAutoObservable(this)
	}

	setIsAuthModalWindowVisble (value: boolean) {
		this.isAuthModalWindowVisble = value
	}

	switchWindows () {
		const value = this.isLoginWindowVisible
		this.isLoginWindowVisible = !value
		this.isRegisterWindowVisible = value
	}
}

export const authStore = new AuthStore