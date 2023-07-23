import { useMutation, useQueryClient } from 'react-query'
import { AddAddressReqBody, addressService } from 'shared/api/address'

export const useAddAddress = (address: AddAddressReqBody, enabled: boolean) => {
	const queryClient = useQueryClient()
	
	const mutation = useMutation({
		mutationKey: ['addresses'],
		mutationFn: () => addressService.AddAddress(address),
		onSuccess: () => queryClient.invalidateQueries(['addresses'])
	})

	return mutation
}