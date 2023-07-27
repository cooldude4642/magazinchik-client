import { useMutation, useQueryClient } from 'react-query'
import { reviewService } from 'shared/api/review/reviewService'
import { CreateReviewReqBody } from 'shared/api/review/types'
import { reviewStore } from '../lib/reviewStore'
import { AxiosError, AxiosResponse } from 'axios'
import { AuthErrorData, AuthResData } from 'shared/api'

export const useCreateReview = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<AxiosResponse<void>, AxiosError<AuthErrorData>, CreateReviewReqBody>({
		mutationKey: ['reviews', 'create'],
		mutationFn: (data) => reviewService.createReveiw(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['reviews'])
			reviewStore.setIsCreateReviewModalWindowVisible(false)
		},
	})

	return mutation
}