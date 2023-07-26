import { api } from '../api'
import { Paginated } from '../types'
import { CartItem } from './types'

class CartService {
	async addToCart (productId: number) {
		const response = await api.post<void>('/cart/add', {}, { params: { productId } })
	
		return response
	}

	async removeFromCart (productId: number) {
		const response = await api.delete<void>('/cart/remove', { params: { productId } })
	
		return response
	}

	async getAllCartProducts (page = 0, limit = 50) {
		const response = await api.get<Paginated<CartItem>>('/cart/user', { params: { page, limit } })
	
		return response
	}

	async decreaseFromCart (productId: number) {
		const response = await api.put<void>('/cart/decrease', null, { params: { productId } })
	
		return response
	}

	async setCountToCart (productId: number, count: number) {
		const response = await api.patch<void>('/cart/set', null, { params: { productId, count } })
	
		return response
	}
}

export const cartService = new CartService