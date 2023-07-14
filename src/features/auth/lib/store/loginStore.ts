import { makeAutoObservable } from 'mobx'

class LoginStore {
	email: string = ''
	password: string = ''

	constructor () {
		makeAutoObservable(this)
	}

	setEmail (email: string) {
		this.email = email
	}

	setPassword (password: string) {
		this.password = password
	}
}

export const loginStore = new LoginStore