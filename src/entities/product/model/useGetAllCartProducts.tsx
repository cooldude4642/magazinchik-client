import { useQuery } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useGetAllCartProducts = () => {
	const query = useQuery({
		queryKey: ['products', 'cart'],
		queryFn: () => cartService.getAllCartProducts()
	})

	return query
}