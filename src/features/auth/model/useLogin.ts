import { viewerStore } from 'entities/viewer'
import { useMutation } from 'react-query'
import { AuthErrorData, AuthResData, LoginReqData, authService } from 'shared/api'
import { AxiosError, AxiosResponse } from 'axios'

export const useLogin = () => {
	const mutation = useMutation<AxiosResponse<AuthResData>, AxiosError<AuthErrorData>, LoginReqData>({
		mutationKey: 'login',
		mutationFn: (data) => authService.login(data),
		onSuccess: ({ data: { user, accessToken } }) => {
			viewerStore.setViewer(user)
			viewerStore.setAccessToken(accessToken)
			viewerStore.setIsAuth(true)
		}
	})

	return mutation
}