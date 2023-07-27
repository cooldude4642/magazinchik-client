import { makeAutoObservable } from 'mobx'

class OrderStore {
	isPayOrderLoading = false

	constructor () {
		makeAutoObservable(this)
	}

	setIsPayOrderLoading (value: boolean) {
		this.isPayOrderLoading = value
	}
}

export const orderStore = new OrderStore