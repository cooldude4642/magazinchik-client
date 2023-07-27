import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { orderService } from 'shared/api/order'

export const useCheckPayment = () => {
	const query = useQuery({
		queryKey: ['orders', 'check'],
		queryFn: () => orderService.checkPayment(),
		enabled: viewerStore.isAuth
	})

	return query
}