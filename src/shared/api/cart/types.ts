import { ProductCard } from '../product'

export interface CartItem {
	id: number
	productCount: number
	product: ProductCard
}