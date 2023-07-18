import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'
import { productStore } from '../lib/productStore'

export const useGetPopularProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'popular'],
		queryFn: () => productService.getPopularProducts(),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts(data.rows)
	})

	return query
}