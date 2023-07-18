export interface ProductDetails {
	id: number
	name: string
	price: number
	description: string
	reviewCount: number
	rateCount: number
	averageRating: number
	purchases: number
	cathegory: Category
	photos: Photo[]
	isFavourite: boolean
	isInCart: boolean
}

export interface ProductCard {
	id: number
	name: string
	price: number
	rateCount: number
	averageRating: number
	photos: Photo[]
	isFavourite?: boolean
	isInCart?: boolean
}

export interface Photo {
	id: number
	order: number
}

export interface Category {
	id: number
	name: string
	isParrent: boolean
	parent: Category
}

export interface Paginated<TData> {
	pages: number
	rows: TData[]
}