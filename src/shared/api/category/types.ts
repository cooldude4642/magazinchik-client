export interface ParentCategory {
	id: number
	name: string
	isParent: boolean
	parent: ParentCategory
}

export interface DescendantsCategory {
	id: number
	name: string
	isParent: boolean
	descendants: DescendantsCategory[]
}