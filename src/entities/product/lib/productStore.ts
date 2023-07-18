import { makeAutoObservable } from 'mobx'

export interface ProductItem {
	id: number
	isInCart?: boolean
	isFavourite?: boolean
}

export class ProductStore {
	products = [] as ProductItem[]

	constructor () {
		makeAutoObservable(this)
	}

	setProducts (products: ProductItem[]) {
		this.products = products
	}

	updateProduct (item: ProductItem) {
		const products = [...this.products]
		const product = products.find(product => product.id == item.id)
		const index = products.indexOf(product)

		if (index > -1) {
			product.isFavourite = item.isFavourite ?? product.isFavourite
			product.isInCart = item.isInCart ?? product.isInCart
			products[index] = product
		}

		this.products = [...products]
	}

	deleteProduct (item: ProductItem) {
		const products = [...this.products]
		const product = products.find(product => product.id == item.id)
		const index = products.indexOf(product)

		if (index > -1) {
			products.splice(index, 1)
		}

		this.products = [...products]
	}

	insertProducts (items: ProductItem[]) {
		const products = [...this.products]
		
		for (const item of items) {
			const product = products.find(product => product.id == item.id)
			const index = products.indexOf(product)

			if (index > -1) {
				product.isFavourite = item.isFavourite ?? product.isFavourite
				product.isInCart = item.isInCart ?? product.isInCart
				products[index] = product
			} else {
				products.push(item)
			}
		}

		this.products = [...products]
	}
}

export const productStore = new ProductStore