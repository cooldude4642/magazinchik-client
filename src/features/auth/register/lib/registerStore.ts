import { makeAutoObservable } from 'mobx'

class RegisterStore {
	name = ''
	email = ''
	password = ''
	errorMessage: string  = undefined
	isLoading: boolean = undefined

	constructor () {
		makeAutoObservable(this)
	}

	setName (name: string) {
		this.name = name
		this.setErrorMessage(undefined)
	}

	setEmail (email: string) {
		this.email = email
		this.setErrorMessage(undefined)
	}

	setPassword (password: string) {
		this.password = password
		this.setErrorMessage(undefined)
	}

	setErrorMessage (errorMessage: string) {
		this.errorMessage = errorMessage
	}

	setIsloading (isLoading: boolean) {
		this.isLoading = isLoading
	}
}

export const registerStore = new RegisterStore