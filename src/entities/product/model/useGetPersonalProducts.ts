import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'
import { productStore } from '../lib/productStore'

export const useGetPersonalProducts = (enabled = true) => {
	const query = useQuery({
		queryKey: ['products', 'personal'],
		queryFn: () => productService.getPersonalProducts(),
		enabled,
		onSuccess: ({ data }) => productStore.insertProducts(data)
	})

	return query
}