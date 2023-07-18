import { productStore } from 'entities/product/lib/productStore'
import { useMutation } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useRemoveFromFavourite = (productId: number) => {
	const mutation = useMutation({
		mutationKey: ['products', 'favourite'],
		mutationFn: () => favouriteService.removeFromFavourite(productId),
		onSuccess: () => productStore.updateProduct({ id: productId, isInCart: false })
	})

	return mutation
}