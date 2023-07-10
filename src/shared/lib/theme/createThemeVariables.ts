import { Rgba } from '@material/material-color-utilities'
import { Elevation, Font, FontGroup, Scheme, Shadow, States, Theme, ThemeVariables } from 'shared/types'
import { kebabize } from '../helpers'

export const createThemeVariables = (theme: Theme) => {
	const { schemes, typography, elevations } = theme

	const themeVariables: ThemeVariables = {
		schemes: {
			light: [],
			dark: []
		},
		typography: [],
		elevations: []
	}

	for (const key in schemes) {
		const scheme = schemes[key] as Scheme

		if (scheme === schemes.light) {
			for (const key in scheme) {
				const element = scheme[key]

				if (element.r) {
					const { r, g, b, a } = element as Rgba

					const name = `--${ kebabize(key) }`
					const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

					themeVariables.schemes.light.push(`${ name }: ${ value };`)
				} else if (element.enabled)  {
					const states = element as States

					for (const stateKey in states) {
						const { r, g, b, a } = states[stateKey] as Rgba

						const name = `--${ kebabize(key) }`
						const stateSuffix = stateKey !== 'enabled' ? '-' + stateKey : ''
						const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

						themeVariables.schemes.light.push(`${ name + stateSuffix }: ${ value };`)
					}
				}
			}
		} else if (scheme === schemes.dark) {
			for (const key in scheme) {
				const element = scheme[key]

				if (element.r) {
					const { r, g, b, a } = element as Rgba

					const name = `--${ kebabize(key) }`
					const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

					themeVariables.schemes.dark.push(`${ name }: ${ value };`)
				} else if (element.enabled)  {
					const states = element as States

					for (const stateKey in states) {
						const { r, g, b, a } = states[stateKey] as Rgba

						const name = `--${ kebabize(key) }`
						const stateSuffix = stateKey !== 'enabled' ? '-' + stateKey : ''
						const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

						themeVariables.schemes.dark.push(`${ name + stateSuffix }: ${ value };`)
					}
				}
			}
		}
	}

	for (const key in typography) {
		const fontGroup = typography[key] as FontGroup

		for (const sizeKey in fontGroup) {
			const font = fontGroup[sizeKey] as Font
			
			for (const propertyKey in font) {
				if (propertyKey === 'fontFamily') {
					const name = `--${ key }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = font[propertyKey].join(', ')
					
					themeVariables.typography.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'fontSize') {
					const name = `--${ key }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey] }px`
					
					themeVariables.typography.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'lineHeight') {
					const name = `--${ key }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey] }px`
					
					themeVariables.typography.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'fontWeight') {
					const name = `--${ key }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = font[propertyKey]
					
					themeVariables.typography.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'letterSpacing') {
					const name = `--${ key }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey].toFixed(2) }px`
					
					themeVariables.typography.push(`${ name }: ${ value };`)
				}
			}
		}
	}

	for (const key in elevations) {
		const elevation = elevations[key] as Elevation
		let name = `--elevation-${ key }`

		const values = {
			dense: '',
			soft: ''
		}

		for (const shadowKey in elevation) {
			const { x, y, blur, spread, color: { r, g, b, a } } = elevation[shadowKey] as Shadow

			const value = `${ x }px ${ y }px ${ blur }px ${ spread }px rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })` 
			
			if (shadowKey === 'dense') {
				values.dense = value
			} else if (shadowKey === 'soft') {
				values.soft = value
			}
		}

		themeVariables.elevations.push(`${ name }: ${ values.dense }, ${ values.soft };`)
	}

	return themeVariables
}