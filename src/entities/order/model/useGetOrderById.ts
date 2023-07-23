import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order/orderService'

export const useGetOrderById = (orderId: number, enabled: boolean) => {
	const query = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderService.getOrderById(orderId),
		enabled
	})

	return query
}