import { useMutation } from 'react-query'
import { cartService } from 'shared/api/cart'
import { productService } from 'shared/api/product'

export const useRemoveFromCart = (productId: number) => {
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.removeFromCart(productId)
	})

	return query
}