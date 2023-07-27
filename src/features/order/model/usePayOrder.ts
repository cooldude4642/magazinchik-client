import { useMutation, useQueryClient } from 'react-query'
import { orderService } from 'shared/api/order'

export const usePayOrder = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationKey: ['orders', 'pay'],
		mutationFn: ({ orderId }: { orderId: number }) => orderService.payOrder(orderId),
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries(['orders'])
			window.location.href = data.url
		}
	})

	return mutation
}