import { productStore } from 'entities/product/lib/productStore'
import { useMutation } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useAddToFavourite = (productId: number) => {
	const mutation = useMutation({
		mutationKey: ['products', 'favourite'],
		mutationFn: () => favouriteService.addToFavourite(productId),
		onSuccess: () => productStore.updateProduct({ id: productId, isFavourite: true })
	})

	return mutation
}