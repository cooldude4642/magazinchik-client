export interface Category {
	id: number
	name: string
	isParrent: boolean
	parent: Category
}