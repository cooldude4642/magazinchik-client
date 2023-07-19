import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { AuthErrorData, AuthResData, RegisterReqData, authService } from 'shared/api'

export const useRegister = () => {
	const mutation = useMutation<AxiosResponse<AuthResData>, AxiosError<AuthErrorData>, RegisterReqData>({
		mutationKey: 'register',
		mutationFn: (data) => authService.register(data),
		onSuccess: () => {
			window.location.href = window.location.href
		}
	})

	return mutation
}