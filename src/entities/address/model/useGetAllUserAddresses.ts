import { useQuery } from 'react-query'
import { viewerService } from 'shared/api/viewer'

export const useGetAllUserAddresses = (enabled: boolean) => {
	const query = useQuery({
		queryKey: ['addresses'],
		queryFn: () => viewerService.getAllUserAddresses(),
		enabled
	})

	return query
}