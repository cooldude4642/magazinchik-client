import { api } from '../api'

class FavouriteService {
	async addToFavourite (productId: number) {
		const response = await api.post<void>('/favourite/add', {}, { params: { productId } })
	
		return response
	}

	async removeFromFavourite (productId: number) {
		const response = await api.delete<void>('/favourite/remove', { params: { productId } })
	
		return response
	}
}

export const favouriteService = new FavouriteService