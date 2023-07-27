import { useMutation } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useAddToFavourite = (productId: number) => {
	const mutation = useMutation({
		mutationKey: ['products', 'favourite', 'add'],
		mutationFn: () => favouriteService.addToFavourite(productId),
	})

	return mutation
}