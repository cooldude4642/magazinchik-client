import { useState } from 'react'
import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetPopularProducts = () => {
	const [page, setPage] = useState(0)

	const query = useQuery({
		queryKey: ['products', page],
		queryFn: () => productService.getPersonalProducts(page),
		keepPreviousData : true,
		enabled: false
	})

	return { ...query, page, setPage }
}