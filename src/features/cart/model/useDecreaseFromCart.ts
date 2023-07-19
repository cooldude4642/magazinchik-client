import { useMutation, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useDecreaseFromCart = (productId: number) => {
	const queryClient = useQueryClient()
	
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.decreaseFromCart(productId),
		onSuccess: () => queryClient.invalidateQueries(['products', 'cart'])
	})

	return query
}