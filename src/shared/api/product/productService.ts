import { api } from '../api'
import { Product } from './types'

class ProductService {
	getProductById (id: number) {
		const response = api.get<Product>(`/product/detail?productId=${ id }`)

		return response
	}

	getAllProducts () {
		const response = api.get<Product[]>('/product/get_all')

		return response
	}

	getPersonalProducts (limit: number) {
		const response = api.get<Product[]>(`/product/random_personal?limit=${ limit }`)

		return response
	}
}

export const productService = new ProductService