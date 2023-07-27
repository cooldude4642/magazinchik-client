import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetProductsFromCategory = (categoryId: number, enabled = true) => {
	const query = useQuery({
		queryKey: ['products', { categoryId }],
		queryFn: () => productService.getProductsFromCategory(categoryId),
		enabled
	})

	return query
}