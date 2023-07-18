import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'
import { productStore } from '../lib/productStore'

export const useGetProductById = (id: number, enabled = true) => {
	const query = useQuery({
		queryKey: ['products'],
		queryFn: () => productService.getProductById(id),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts([data])
	})

	return query
}