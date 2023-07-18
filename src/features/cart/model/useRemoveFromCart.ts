import { productStore } from 'entities/product/lib/productStore'
import { useMutation } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useRemoveFromCart = (productId: number) => {
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.removeFromCart(productId),
		onSuccess: () => productStore.updateProduct({ id: productId, isInCart: false })
	})

	return query
}