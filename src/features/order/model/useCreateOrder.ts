import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { orderService } from 'shared/api/order'

export const useCreateOrder = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const query = useMutation({
		mutationKey: ['orders', 'create'],
		mutationFn: ({ addressId }: { addressId: number }) => orderService.createOrder(addressId),
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries(['orders'])
			router.push(`/orders/${ data }`)
		}
	})

	return query
}