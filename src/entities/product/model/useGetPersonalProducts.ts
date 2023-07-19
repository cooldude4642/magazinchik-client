import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetPersonalProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'personal'],
		queryFn: () => productService.getPersonalProducts(),
		enabled
	})

	return query
}