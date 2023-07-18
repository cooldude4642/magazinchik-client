import { useQuery, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'
import { productStore } from '../lib/productStore'

export const useGetAllCartProducts = (enabled = true) => {
	const queryClient = useQueryClient()
	queryClient.invalidateQueries({ queryKey: ['prdoucts', 'cart'] })

	const query = useQuery({
		queryKey: ['products', 'cart'],
		queryFn: () => cartService.getAllCartProducts(),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts(data.rows.map(item => ({
			id: item.product.id,
			isFavourite: item.product.isFavourite,
			isInCart: item.product.isInCart
		})))
	})

	return query
}