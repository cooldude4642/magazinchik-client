import { makeAutoObservable } from 'mobx'

class RegisterStore {
	name = ''
	email = ''
	password = ''

	constructor () {
		makeAutoObservable(this)
	}

	setName (name: string) {
		this.name = name
	}

	setEmail (email: string) {
		this.email = email
	}

	setPassword (password: string) {
		this.password = password
	}
}

export const registerStore = new RegisterStore