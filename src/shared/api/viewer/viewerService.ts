import { api } from '../api'

class ViewerService {
	async getAllUserAddresses () {
		const response = await api.get('/address/all-user')

		return response
	}
}

export const viewerService = new ViewerService