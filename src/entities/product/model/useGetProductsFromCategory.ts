import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetProductsFromCategory = (id: number, name: string) => {

	const query = useQuery({
		queryKey: ['products', 'from-category', name],
		queryFn: () => productService.getProductsFromCategory(id)
	})

	return query
}