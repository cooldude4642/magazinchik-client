import { makeAutoObservable } from 'mobx'
import { Address } from 'shared/api/address'

class AddressStore {
	activeAddress: Address = undefined
	isAddressListVisible = false

	constructor () {
		makeAutoObservable(this)
	}

	setActiveAddress (address: Address) {
		this.activeAddress = address
	}

	setIsAddressListVisible (value: boolean) {
		this.isAddressListVisible = value
	}
}

export const addressStore = new AddressStore