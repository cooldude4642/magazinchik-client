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
		const product = this.products.find(product => product.id == item.id)
		const index = this.products.indexOf(product)

		if (index > -1) {
			product.isFavourite = item.isFavourite ?? product.isFavourite
			product.isInCart = item.isInCart ?? product.isInCart
			this.products[index] = product
		}
	}

	deleteProduct (item: ProductItem) {
		const product = this.products.find(product => product.id == item.id)
		const index = this.products.indexOf(product)

		if (index > -1) {
			this.products.splice(index, 1)
		}
	}

	insertProducts (items: ProductItem[]) {
		for (const item of items) {
			const product = this.products.find(product => product.id == item.id)
			const index = this.products.indexOf(product)

			if (index > -1) {
				product.isFavourite = item.isFavourite ?? product.isFavourite
				product.isInCart = item.isInCart ?? product.isInCart
				this.products[index] = product
			} else {
				this.products.push(item)
			}
		}
	}
}

export const productStore = new ProductStore