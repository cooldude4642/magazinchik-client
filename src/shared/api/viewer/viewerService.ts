import { Address } from '../address'
import { api } from '../api'

class ViewerService {
	async getAllUserAddresses () {
		const response = await api.get<Address[]>('/address/all-user')

		return response
	}
}

export const viewerService = new ViewerService