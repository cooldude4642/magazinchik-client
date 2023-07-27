export interface Review {
	user: {
		id: number
		name: string
	}
	id: number
	rate: number
	text: string
	updatedAt: string
}

export interface CreateReviewReqBody {
	productId: number
	text: string
	rate: number
}