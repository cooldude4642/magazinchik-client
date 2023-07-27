import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order/orderService'

export const useGetAllUserOrders = () => {

	const query = useQuery({
		queryKey: ['orders', 'all'],
		queryFn: () => orderService.getAllUserOrders(),
		enabled: viewerStore.isAuth
	})

	return query
}