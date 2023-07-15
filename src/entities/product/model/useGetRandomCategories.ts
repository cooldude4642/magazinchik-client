import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetRandomCategories = () => {
	const query = useQuery({
		queryKey: ['categories', 'random'],
		queryFn: () => productService.getRandomCategories(3)
	})

	return query
}