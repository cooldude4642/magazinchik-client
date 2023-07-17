import { api } from '../api'
import { Banner } from './types'

class BannerService {
	getActiveBanner () {
		const response = api.get<Banner>('/banner/active')

		return response
	}
}

export const bannerService = new BannerService