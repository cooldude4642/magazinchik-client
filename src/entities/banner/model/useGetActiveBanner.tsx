import { useQuery } from 'react-query'
import { bannerService } from 'shared/api/banner/bannerService'

export const useGetActiveBanner = () => {
	const query = useQuery({
		queryKey: ['banner'],
		queryFn: () => bannerService.getActiveBanner()
	})

	return query
}