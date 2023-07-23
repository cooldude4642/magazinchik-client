import { makeAutoObservable } from 'mobx'

class AddressStore {
	isAddAddressModalWindowVisible = false

	constructor () {
		makeAutoObservable(this)
	}

	setIsAddAddressModalWindowVisible (value: boolean) {
		this.isAddAddressModalWindowVisible = value
	}
}

export const addressStore = new AddressStore