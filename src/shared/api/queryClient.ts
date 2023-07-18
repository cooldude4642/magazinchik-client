import { QueryClient } from 'react-query'

const queryClient = new QueryClient({ defaultOptions: {
	queries: {
		refetchOnWindowFocus: false,
		onSuccess: (data) => console.log(data),
		onError: (data) => console.log(data),
		retry: 0
	},
	mutations: {
		onSuccess: (data) => console.log(data),
		onError: (data) => console.log(data)
	}
} })

export { queryClient }