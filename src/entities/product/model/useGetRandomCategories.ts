import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { categoryService } from 'shared/api/category'
import { productService } from 'shared/api/product'

export const useGetRandomCategories = () => {
	const query = useQuery({
		queryKey: ['categories', 'random'],
		queryFn: () => categoryService.getRandomCategories(),
		enabled: viewerStore.isAuth !== undefined
	})

	return query
}