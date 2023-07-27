import { api } from '../api'
import { Paginated } from '../types'
import { CreateReviewReqBody, Review } from './types'

class ReviewService {
	async getAllProductReviews (productId: number, limit = 5, page = 0) {
		const response = await api.get<Paginated<Review>>('/review/all-with-text-for-product', { params: { productId, limit, page } })

		return response
	}

	async createReveiw (data: CreateReviewReqBody) {
		const response = await api.post<void>('/review/create', data)

		return response
	}
}

export const reviewService = new ReviewService