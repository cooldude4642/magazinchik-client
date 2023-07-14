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
	cathegory: {
		id: number
		name: string
		isParent: boolean
		parent: string
	}
	photos: {
		id: number
		photoOrder: number
	}[]
}