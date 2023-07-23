import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order/orderService'

export const useGetAllUserOrders = (enabled: boolean) => {
	const query = useQuery({
		queryKey: ['orders'],
		queryFn: () => orderService.getAllUserOrders(),
		enabled
	})

	return query
}