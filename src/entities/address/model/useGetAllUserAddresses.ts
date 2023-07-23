import { viewerStore } from 'entities/viewer'
import { useQuery, useQueryClient } from 'react-query'
import { viewerService } from 'shared/api/viewer'

export const useGetAllUserAddresses = () => {
	const queryClient = useQueryClient()
	queryClient.invalidateQueries({ queryKey: ['prdoucts', 'cart'] })
	
	const query = useQuery({
		queryKey: ['addresses'],
		queryFn: () => viewerService.getAllUserAddresses(),
		enabled: viewerStore.isAuth
	})

	return query
}