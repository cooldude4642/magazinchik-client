import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'
import { productStore } from '../lib/productStore'

export const useGetAllProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'all'],
		queryFn: () => productService.getAllProducts(),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts(data.rows)
	})

	return query
}