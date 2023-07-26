import { api } from '../api'
import { Paginated } from '../types'
import { Order } from './types'

class OrderService {
	async getOrderById (orderId: number) {
		const response = await api.get<Order>('/order', { params: { orderId } })

		return response
	}

	async getAllUserOrders (page = 0, limit = 10) {
		const response = await api.get<Paginated<Order>>('/order/user', { params: { page, limit } })

		return response
	}

	async createOrder (addressId: number) {
		const response = await api.post<void>('/order/create', { params: { addressId } })

		return response
	}
}

export const orderService = new OrderService