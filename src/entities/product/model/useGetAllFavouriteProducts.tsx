import { useQuery, useQueryClient } from 'react-query'
import { favouriteService } from 'shared/api/favourite'
import { productStore } from '../lib/productStore'

export const useGetAllFavouriteProducts = (enabled = true) => {
	const queryClient = useQueryClient()
	queryClient.invalidateQueries({ queryKey: ['prdoucts', 'favourite'] })

	const query = useQuery({
		queryKey: ['products', 'favourite'],
		queryFn: () => favouriteService.getAllFavouriteProducts(),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts(data.rows.map(item => ({
			id: item.product.id,
			isFavourite: item.product.isFavourite,
			isInCart: item.product.isInCart
		})))
	})

	return query
}