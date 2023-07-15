export interface Product {
	id: number
	name: string
	slug: string
	price: number
	description: string
	reviewCount: number
	reviewNoTextCount: number
	averageRating: number
	purchases: number
	cathegory: Category
	photos: {
		id: number
		photoOrder: number
	}[]
}

export interface Category {
	id: number
	name: string
	isParrent: boolean
	parent: Category
}