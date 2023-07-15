import { useState } from 'react'
import { useQuery } from 'react-query'
import { productService } from 'shared/api/product'

export const useGetPopularProducts = () => {
	const [page, setPage] = useState(0)

	const query = useQuery({
		queryKey: ['products', 'popular', page],
		queryFn: () => productService.getPopularProducts(page),
		keepPreviousData : true
	})

	return { ...query, page, setPage }
}