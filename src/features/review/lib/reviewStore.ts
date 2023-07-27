import { makeAutoObservable } from 'mobx'

class ReviewStore {
	isCreateReviewModalWindowVisible = false
	productId: number = undefined

	constructor () {
		makeAutoObservable(this)
	}

	setIsCreateReviewModalWindowVisible (value: boolean) {
		this.isCreateReviewModalWindowVisible = value
	}

	setProductId (productId: number) {
		this.productId = productId
	}
}
export const reviewStore = new ReviewStore