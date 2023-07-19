import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetPopularProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'popular'],
		queryFn: () => productService.getPopularProducts(),
		enabled
	})

	return query
}