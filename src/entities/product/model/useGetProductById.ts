import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetProductById = (id: number, enabled = true) => {
	const query = useQuery({
		queryKey: ['products'],
		queryFn: () => productService.getProductById(id),
		enabled
	})

	return query
}