import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { Category } from './types'

class CategoryService {
	constructor () {
		makeAutoObservable(this)
	}

	getRandomCategories (count = 3) {
		const response = api.get<Category[]>('/cathegory/random', { params: { count } })

		return response
	}
}

export const categoryService = new CategoryService