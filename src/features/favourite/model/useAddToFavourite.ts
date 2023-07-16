import { useMutation } from 'react-query'
import { productService } from 'shared/api/product'

export const useAddToFavourite = (id: number) => {
	const mutation = useMutation({
		mutationKey: ['products', 'favourite', 'add'],
		mutationFn: () => productService.addToFavourite(id)
	})

	return mutation
}