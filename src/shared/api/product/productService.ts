import { api } from '../api'
import { Category, Product } from './types'

class ProductService {
	getProductById (id: number) {
		const response = api.get<Product>(`/product/detail?productId=${ id }`)

		return response
	}

	getAllProducts () {
		const response = api.get<Product[]>('/product/get_all')

		return response
	}

	getPopularProducts (page: number) {
		const response = api.get<{ pages: number, currentOffset: number, currentPage: Product[] }>(`/product/popular?limit=10&offset=${ page }`)

		return response
	}

	getPersonalProducts () {
		const response = api.get<Product[]>('/product/random_personal?limit=10')

		return response
	}

	getRandomCategories (count: number = 3) {
		const response = api.get<Category[]>(`/cathegory/random?count=${ count }`)

		return response
	}

	getProductsFromCategory (categoryId: number, limit: number = 10) {
		const response = api.get<Product[]>(`/product/random_from_cathegory?cathegoryId=${ categoryId }&limit=${ limit }`)

		return response
	}
}

export const productService = new ProductService