import { Photo } from '../product'

export interface Order {
	id: number
	price: number
	orderStatus: number
	orderProducts: OrderProduct[]
	address: Address
	paymentId: string
	createdAt: string
	updatedAt: string
}

export interface OrderProduct {
	id: number
	product: OrderProductCard
	productCount: number
    totalPrice: number
}

export interface OrderProductCard {
	id: number
	name: string
	slug: number
	photos: Photo[]
}

export interface Address {
	id: number
	city: string
	street: string
	house: string
	flat: string
	userId: number
}