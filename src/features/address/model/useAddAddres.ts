import { useMutation, useQueryClient } from 'react-query'
import { AddAddressReqBody, addressService } from 'shared/api/address'

export const useAddAddress = () => {
	const queryClient = useQueryClient()
	
	const mutation = useMutation({
		mutationKey: ['addresses', 'add'],
		mutationFn: (address: AddAddressReqBody) => addressService.AddAddress(address),
		onSuccess: () => queryClient.invalidateQueries(['addresses'])
	})

	return mutation
}