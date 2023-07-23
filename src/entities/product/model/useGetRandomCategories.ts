import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetRandomCategories = () => {
	const query = useQuery({
		queryKey: ['categories', 'random'],
		queryFn: () => productService.getRandomCategories(),
		enabled: viewerStore.isAuth !== undefined
	})

	return query
}