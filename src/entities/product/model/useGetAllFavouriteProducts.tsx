import { useQuery } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useGetAllFavouriteProducts = () => {
	const query = useQuery({
		queryKey: ['products', 'favourite'],
		queryFn: () => favouriteService.getAllFavouriteProducts(),
		enabled: false
	})

	return query
}