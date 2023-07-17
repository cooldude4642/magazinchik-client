import { api } from '../api'
import { Paginated } from '../product'
import { FavouriteProduct } from './types'

class FavouriteService {
	async addToFavourite (productId: number) {
		const response = await api.post<void>('/favourite/add', {}, { params: { productId } })
	
		return response
	}

	async removeFromFavourite (productId: number) {
		const response = await api.delete<void>('/favourite/remove', { params: { productId } })
	
		return response
	}

	async getAllFavouriteProducts (page = 0, limit = 50) {
		const response = await api.get<Paginated<FavouriteProduct>>('/favourite/user', { params: { page, limit } })
	
		return response
	}
}

export const favouriteService = new FavouriteService