import { makeAutoObservable } from 'mobx'
import { Viewer } from './types'

class ViewerStore {
	viewer: Viewer = undefined
	accessToken: string = undefined
	isAuth: boolean = undefined

	constructor () {
		makeAutoObservable(this)
	}

	setViewer (viewer: Viewer) {
		this.viewer = viewer
	}

	setAccessToken (accessToken: string) {
		this.accessToken = accessToken
	}

	setIsAuth (isAuth: boolean) {
		this.isAuth = isAuth
	}
}

export const viewerStore = new ViewerStore