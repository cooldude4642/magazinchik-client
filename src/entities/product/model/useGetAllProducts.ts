import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetAllProducts = () => {
	const query = useQuery({
		queryKey: ['products', 'all'],
		queryFn: () => productService.getAllProducts(),
		enabled: false
	})

	return query
}