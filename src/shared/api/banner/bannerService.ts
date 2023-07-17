import { api } from '../api'
import { ProductDetails } from '../product'

class BannerService {
	getBannerById (id: number) {
		// const response = api.get<ProductDetails>('/product/detail', { params: { id } })

		// return response
	}
}

export const bannerService = new BannerService