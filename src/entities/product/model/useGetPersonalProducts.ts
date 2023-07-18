import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetPersonalProducts = () => {
	const query = useQuery({
		queryKey: ['products', 'personal'],
		queryFn: () => productService.getPersonalProducts()
	})

	return query
}