import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order/orderService'

export const useGetOrderById = (orderId: number, enabled: boolean) => {
	const query = useQuery({
		queryKey: ['orders', { id: orderId }],
		queryFn: () => orderService.getOrderById(orderId),
		enabled: viewerStore.isAuth && enabled
	})

	return query
}