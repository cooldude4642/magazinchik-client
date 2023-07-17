export interface ProductDetails {
	id: number
	name: string
	slug: string
	price: number
	description: string
	reviewCount: number
	reviewNoText: number
	averageRating: number
	purchases: number
	cathegory: Category
	photos: Photo
}

export interface ProductCard {
	id: number
	name: string
	slug: string
	price: number
	reviewCount: number
	rateCount: number
	averageRating: number
	purchases: number
	cathegory: Category
	photos: Photo
	isFavourite: boolean
	isInCart: boolean
}

export interface Photo {
	id: number
	photoOrder: number
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