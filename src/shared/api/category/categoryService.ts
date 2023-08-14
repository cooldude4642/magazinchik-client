import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { DescendantsCategory, ParentCategory } from './types'

class CategoryService {
	constructor () {
		makeAutoObservable(this)
	}

	getRandomCategories (count = 3) {
		const response = api.get<ParentCategory[]>('/cathegory/random', { params: { count } })

		return response
	}

	getAllCategories () {
		const response = api.get<DescendantsCategory[]>('/cathegory/all')

		return response
	}

	getDescendantsCategoryById (cathegoryId: number) {
		const response = api.get<DescendantsCategory>('/cathegory/descendants', { params: { cathegoryId } })

		return response
	}

	getParentCategoryById (cathegoryId: number) {
		const response = api.get<ParentCategory>('/cathegory/parents', { params: { cathegoryId } })

		return response
	}
}

export const categoryService = new CategoryService