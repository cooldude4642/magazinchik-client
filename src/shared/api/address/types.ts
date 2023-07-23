export interface Address {
	id: number
	city: string
	street: string
	house: string
	flat: string
	userId: number
}

export interface AddAddressReqBody {
	city: string
	street: string
	house: string
	flat: string
}