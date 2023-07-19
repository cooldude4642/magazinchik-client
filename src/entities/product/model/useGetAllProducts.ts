import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetAllProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'all'],
		queryFn: () => productService.getAllProducts(),
		enabled
	})

	return query
}