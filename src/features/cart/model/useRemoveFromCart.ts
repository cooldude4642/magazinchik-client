import { useMutation, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useRemoveFromCart = (productId: number) => {
	const queryClient = useQueryClient()
	
	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: () => cartService.removeFromCart(productId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
	})

	return query
}