import { useMutation, useQueryClient } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useAddToFavourite = (productId: number) => {
	const queryClient = useQueryClient()
	
	const mutation = useMutation({
		mutationKey: ['products', 'favourite'],
		mutationFn: () => favouriteService.addToFavourite(productId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', 'favourite'] })
	})

	return mutation
}