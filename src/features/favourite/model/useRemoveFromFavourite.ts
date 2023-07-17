import { useMutation, useQueryClient } from 'react-query'
import { favouriteService } from 'shared/api/favourite'

export const useRemoveFromFavourite = (productId: number) => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationKey: ['products', 'favourite'],
		mutationFn: () => favouriteService.removeFromFavourite(productId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products', 'favourite'] })
	})

	return mutation
}