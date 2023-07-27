import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order/orderService'

export const useGetAllUserOrders = (enabled = true) => {

	const query = useQuery({
		queryKey: ['orders', 'all'],
		queryFn: () => orderService.getAllUserOrders(),
		enabled: viewerStore.isAuth && enabled
	})

	return query
}