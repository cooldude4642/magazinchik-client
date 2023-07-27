import { useMutation, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useAddToCart = (productId: number) => {
	const queryClient = useQueryClient()

	const query = useMutation({
		mutationKey: ['products', 'cart', 'add'],
		mutationFn: () => cartService.addToCart(productId),
		onSuccess: () => queryClient.invalidateQueries(['products', 'cart'])
	})

	return query
}