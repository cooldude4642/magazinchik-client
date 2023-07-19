import { useQuery, useQueryClient } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useGetAllFavouriteProducts = () => {
	const queryClient = useQueryClient()
	queryClient.invalidateQueries({ queryKey: ['prdoucts', 'favourite'] })

	const query = useQuery({
		queryKey: ['products', 'favourite'],
		queryFn: () => favouriteService.getAllFavouriteProducts()
	})

	return query
}