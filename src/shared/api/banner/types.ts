import { Photo } from '../product'

export interface Banner {
	id: number
	name: string
	isActive: boolean
	photos: Photo[]
}