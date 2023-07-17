import { api } from '../api'

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
		const response = await api.get<void>('/cart/user', { params: { page, limit } })
	
		return response
	}
}

export const cartService = new CartService