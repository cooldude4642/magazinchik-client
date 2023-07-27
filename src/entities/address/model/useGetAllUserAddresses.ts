import { viewerStore } from 'entities/viewer'
import { useQuery } from 'react-query'
import { viewerService } from 'shared/api/viewer'

export const useGetAllUserAddresses = () => {
	const query = useQuery({
		queryKey: ['addresses', 'all'],
		queryFn: () => viewerService.getAllUserAddresses(),
		enabled: viewerStore.isAuth
	})

	return query
}