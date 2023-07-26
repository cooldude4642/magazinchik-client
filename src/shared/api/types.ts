export interface Paginated<TData> {
	pages: number
	count: number
	rows: TData[]
}