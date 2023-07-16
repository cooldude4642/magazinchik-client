import { useMutation } from 'react-query'
import { productService } from 'shared/api/product'

export const useRemoveFromFavourite = (id: number) => {
	const mutation = useMutation({
		mutationKey: ['products', 'favourite', 'remove'],
		mutationFn: () => productService.removeToFavourite(id)
	})

	return mutation
}