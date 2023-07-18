import { api } from '../api'
import { Category, Paginated, ProductCard, ProductDetails } from './types'

class ProductService {
	getProductById (productId: number) {
		const response = api.get<ProductDetails>('/product/detail', { params: { productId } })

		return response
	}

	getAllProducts (page = 0, limit = 50) {
		const response = api.get<Paginated<ProductCard>>('/product/get-all', { params: { page, limit } })

		return response
	}

	getPopularProducts (page = 0, limit = 10) {
		const response = api.get<Paginated<ProductCard>>('/product/popular', { params: { page, limit } })

		return response
	}

	getPersonalProducts (count = 10) {
		const response = api.get<ProductCard[]>('/product/personal', { params: { count } })

		return response
	}

	getRandomCategories (count = 3) {
		const response = api.get<Category[]>('/cathegory/random', { params: { count } })

		return response
	}

	getProductsFromCategory (cathegoryId: number, count = 10) {
		const response = api.get<ProductCard[]>('/product/random-from-cathegory', { params: { cathegoryId, count } })

		return response
	}
}

export const productService = new ProductService