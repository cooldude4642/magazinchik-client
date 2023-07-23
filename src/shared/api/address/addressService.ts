import { AddAddressReqBody, Address } from './types'
import { api } from '../api'

class AddressService {
	async AddAddress (address: AddAddressReqBody) {
		const response = await api.post<Address>('/address/create', address)

		return response
	}
}

export const addressService = new AddressService