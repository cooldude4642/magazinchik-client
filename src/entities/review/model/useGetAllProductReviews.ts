import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { reviewService } from 'shared/api/review/reviewService'

export const useGetAllProductReviews = (productId: number) => {
	const query = useQuery({
		queryKey: ['reviews', 'all'],
		queryFn: () => reviewService.getAllProductReviews(productId),
		enabled: viewerStore.isAuth,
	})

	return query
}