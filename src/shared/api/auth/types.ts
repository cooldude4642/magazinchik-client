import { Viewer } from 'entities/viewer'

export interface AuthResData {
	user: Viewer
	accessToken: string
}

export interface AuthErrorData {
	Errors: { [key: string]: string }
	Message: string
	StatusCode: number
}

export interface RegisterReqData {
	name: string
	email: string
	password: string
}

export interface LoginReqData {
	email: string
	password: string
}