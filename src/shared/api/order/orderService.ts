import { api } from '../api'
import { Paginated } from '../types'
import { Order, PayOrderResBody } from './types'

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
		const response = await api.post<number>('/order/create', {}, { params: { addressId } })

		return response
	}

	async payOrder (orderId: number) {
		const response = await api.post<PayOrderResBody>('/order/pay', {}, { params: { orderId } })

		return response
	}

	async checkPayment () {
		const response = await api.get<void>('/order/check-payment')

		return response
	}
}

export const orderService = new OrderService