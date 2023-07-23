import { useMutation, useQueryClient } from 'react-query'
import { orderService } from 'shared/api/order'

export const useCreateOrder = () => {
	const queryClient = useQueryClient()

	const query = useMutation({
		mutationKey: ['products', 'cart'],
		mutationFn: ({ productId }: { productId: number }) => orderService.createOrder(productId),
		onSuccess: () => queryClient.invalidateQueries(['products', 'cart'])
	})

	return query
}