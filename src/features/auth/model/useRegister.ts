import { AxiosError, AxiosResponse } from 'axios'
import { viewerStore } from 'entities/viewer'
import { useMutation } from 'react-query'
import { AuthErrorData, AuthResData, RegisterReqData, authService } from 'shared/api'

export const useRegister = () => {
	const mutation = useMutation<AxiosResponse<AuthResData>, AxiosError<AuthErrorData>, RegisterReqData>({
		mutationKey: 'register',
		mutationFn: (data) => authService.register(data),
		onSuccess: ({ data: { id, name, email, role, accessToken } }) => {
			viewerStore.setViewer({ id, name, email, role })
			viewerStore.setAccessToken(accessToken)
			viewerStore.setIsAuth(true)
		}
	})

	return mutation
}