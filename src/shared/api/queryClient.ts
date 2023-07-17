import { QueryClient } from 'react-query'

const queryClient = new QueryClient({ defaultOptions: {
	queries: {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: (data) => console.log(data),
		onError: (data) => console.log(data)
	},
	mutations: {
		onSuccess: (data) => console.log(data),
		onError: (data) => console.log(data)
	}
} })

export { queryClient }