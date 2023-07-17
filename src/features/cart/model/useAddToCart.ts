import { useMutation } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useAddToCart = (productId: number) => {
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.addToCart(productId)
	})

	return query
}