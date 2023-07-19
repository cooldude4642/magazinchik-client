import { useQuery, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useGetAllCartProducts = (enabled = true) => {
	const queryClient = useQueryClient()
	queryClient.invalidateQueries({ queryKey: ['prdoucts', 'cart'] })

	const query = useQuery({
		queryKey: ['products', 'cart'],
		queryFn: () => cartService.getAllCartProducts(),
		enabled
	})

	return query
}