import { productStore } from 'entities/product/lib/productStore'
import { useMutation } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useAddToCart = (productId: number) => {
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.addToCart(productId),
		onSuccess: () => productStore.updateProduct({ id: productId, isInCart: true })
	})

	return query
}