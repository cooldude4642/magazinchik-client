import { useMutation, useQueryClient } from 'react-query'
import { cartService } from 'shared/api/cart'

export const useSetCountToCart = () => {
	const queryClient = useQueryClient()

	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: ({ id, count }: { id: number, count: number }) => cartService.setCountToCart(id, count),
		onSuccess: () => queryClient.invalidateQueries(['products', 'cart'])
	})

	return query
}