import { useMutation } from 'react-query'
import { AuthErrorData, AuthResData, LoginReqData, authService } from 'shared/api'
import { AxiosError, AxiosResponse } from 'axios'

export const useLogin = () => {
	const mutation = useMutation<AxiosResponse<AuthResData>, AxiosError<AuthErrorData>, LoginReqData>({
		mutationKey: 'login',
		mutationFn: (data) => authService.login(data),
		onSuccess: () => {
			window.location.href = window.location.href
		}
	})

	return mutation
}