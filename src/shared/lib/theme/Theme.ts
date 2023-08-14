import { Rgba, TonalPalette, argbFromRgba, rgbaFromArgb } from '@material/material-color-utilities'
import { kebabize } from '../helpers/kebabize'
import { ColorScheme, ColorSchemes, ColorStates, CreateThemeOptions, Elevation, Elevations, ElevationsOptions, Font, FontGroup, ReferenceColors, ReferenceColorsOptions, Shadow, Theme, ThemeVariables, TonalPalettes, Typography, TypographyOptions } from './types'
import { defaultColors, defaultTypography, defaultElevations } from 'shared/config'

const completeObject = <T extends object | undefined, D extends object>(object: T, defaultObject: D): D => {
	if (object !== undefined) {
		for (const key of Object.keys(defaultObject)) {
			if (Object.keys(defaultObject[key]).length === 0) {
				if (object[key] !== undefined) {
					defaultObject[key] = object[key]
				}
			} else if (object[key] !== undefined && Object.keys(object[key]).length > 0) {
				defaultObject[key] = completeObject(object[key], defaultObject[key])
			}
		}
	}

	return defaultObject
}

const createTonalPalette = (rgba: Rgba) => {
	const palette = TonalPalette.fromInt(argbFromRgba(rgba))

	return palette
}

const createTonalPalettes = (referenceColors: ReferenceColors) => {
	const { primary, secondary, tertiary, neutral, neutralVariant, error } = referenceColors

	const palettes: TonalPalettes = {
		primary: createTonalPalette(primary),
		secondary: createTonalPalette(secondary),
		tertiary: createTonalPalette(tertiary),
		neutral: createTonalPalette(neutral),
		neutralVariant: createTonalPalette(neutralVariant),
		error: createTonalPalette(error),
	}

	return palettes
}

const getTone = (pallete: TonalPalette, tone: number, a: number = 1) => {
	const { r, g, b } = rgbaFromArgb(pallete.tone(tone))
	const rgba: Rgba = { r, g, b, a }

	return rgba
}

const getStates = (pallete: TonalPalette, tone: number) => {
	const states: ColorStates = {
		enabled: getTone(pallete, tone, 1),
		hovered: getTone(pallete, tone, 0.08),
		focused: getTone(pallete, tone, 0.12),
		pressed: getTone(pallete, tone, 0.12),
		draged: getTone(pallete, tone, 0.16),
	}

	return states
}

const createLightScheme = (palletes: TonalPalettes) => {
	const { primary, secondary, tertiary, neutral, neutralVariant, error } = palletes

	const lightScheme: ColorScheme = {
		primary: getStates(primary, 40),
		onPrimary: getStates(primary, 100),
		primaryContainer: getTone(primary, 90),
		onPrimaryContainer: getStates(primary, 10),
		secondary: getTone(secondary, 40),
		onSecondary: getStates(secondary, 100),
		secondaryContainer: getTone(secondary, 90),
		onSecondaryContainer: getStates(secondary, 10),
		tertiary: getTone(tertiary, 40),
		onTertiary: getStates(tertiary, 100),
		tertiaryContainer: getTone(tertiary, 90),
		onTertiaryContainer: getStates(tertiary, 10),
		error: getTone(error, 40),
		onError: getStates(error, 100),
		errorContainer: getTone(error, 90),
		onErrorContainer: getStates(error, 10),
		surface: getTone(neutral, 98),
		surfaceContainerLowest: getTone(neutral, 100),
		surfaceContainerLow: getTone(neutral, 96),
		surfaceContainer: getTone(neutral, 94),
		surfaceContainerHigh: getTone(neutral, 92),
		surfaceContainerHighest: getTone(neutral, 90),
		onSurface: getStates(neutral, 10),
		onSurfaceVariant: getStates(neutralVariant, 30),
		outline: getTone(neutralVariant, 50),
		outlineVariant: getTone(neutralVariant, 80),
		shadowSoft: getTone(neutral, 0),
		shadowDense: getTone(neutral, 0),
		scrim: getTone(neutral, 0),
		inverseSurface: getTone(neutral, 20),
		inverseOnSurface: getStates(neutral, 95),
		inversePrimary: getTone(primary, 80),
	}

	return lightScheme
}

const createDarkScheme = (palettes: TonalPalettes) => {
	const { primary, secondary, tertiary, neutral, neutralVariant, error } = palettes

	const darkScheme: ColorScheme = {
		primary: getStates(primary, 80),
		onPrimary: getStates(primary, 20),
		primaryContainer: getTone(primary, 30),
		onPrimaryContainer: getStates(primary, 90),
		secondary: getTone(secondary, 80),
		onSecondary: getStates(secondary, 20),
		secondaryContainer: getTone(secondary, 30),
		onSecondaryContainer: getStates(secondary, 90),
		tertiary: getTone(tertiary, 80),
		onTertiary: getStates(tertiary, 20),
		tertiaryContainer: getTone(tertiary, 30),
		onTertiaryContainer: getStates(tertiary, 90),
		error: getTone(error, 80),
		onError: getStates(error, 20),
		errorContainer: getTone(error, 30),
		onErrorContainer: getStates(error, 90),
		surface: getTone(neutral, 6),
		surfaceContainerLowest: getTone(neutral, 4),
		surfaceContainerLow: getTone(neutral, 10),
		surfaceContainer: getTone(neutral, 12),
		surfaceContainerHigh: getTone(neutral, 17),
		surfaceContainerHighest: getTone(neutral, 22),
		onSurface: getStates(neutral, 90),
		onSurfaceVariant: getStates(neutralVariant, 80),
		outline: getTone(neutralVariant, 60),
		outlineVariant: getTone(neutralVariant, 30),
		shadowSoft: getTone(neutral, 0),
		shadowDense: getTone(neutral, 0),
		scrim: getTone(neutral, 0),
		inverseSurface: getTone(neutral, 90),
		inverseOnSurface: getStates(neutral, 20),
		inversePrimary: getTone(primary, 40),
	}

	return darkScheme
}

const parseScheme = (scheme: ColorScheme) => {
	const variables = [] as string[]

	for (const colorKey of Object.keys(scheme)) {
		const element = scheme[colorKey]

		if (element.r) {
			const { r, g, b, a } = element as Rgba

			const name = `--${ kebabize(colorKey) }`
			const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

			variables.push(`${ name }: ${ value };`)
		} else if (element.enabled) {
			const states = element as ColorStates

			for (const stateKey of Object.keys(states)) {
				const { r, g, b, a } = states[stateKey] as Rgba

				const name = `--${ kebabize(colorKey) }`
				const state = stateKey !== 'enabled' ? `-${ stateKey }` : ''
				const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

				variables.push(`${ name + state }: ${ value };`)
			}
		}
	}

	return variables
}

const parseTypography = (typography: Typography) => {
	const variables = [] as string[]

	for (const typescaleKey of Object.keys(typography)) {
		const fontGroup = typography[typescaleKey] as FontGroup

		for (const sizeKey of Object.keys(fontGroup)) {
			const font = fontGroup[sizeKey] as Font

			for (const propertyKey of Object.keys(font)) {
				if (propertyKey === 'fontFamily') {
					const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = font[propertyKey].join(', ')

					variables.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'fontSize') {
					const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey] }px`

					variables.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'lineHeight') {
					const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey] }px`

					variables.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'fontWeight') {
					const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = font[propertyKey]

					variables.push(`${ name }: ${ value };`)
				} else if (propertyKey === 'letterSpacing') {
					const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
					const value = `${ font[propertyKey].toFixed(2) }px`

					variables.push(`${ name }: ${ value };`)
				}
			}
		}
	}

	return variables
}

const parseElevations = (elevations: Elevations) => {
	const variables = [] as string[]

	for (const levelKey of Object.keys(elevations)) {
		const elevation = elevations[levelKey] as Elevation
		const name = `--elevation-${ levelKey }`

		let dense = ''
		let soft = ''

		for (const shadowKey of Object.keys(elevation)) {
			const { x, y, blur, spread, color: { r, g, b, a } } = elevation[shadowKey] as Shadow

			const value = `${ x }px ${ y }px ${ blur }px ${ spread }px rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

			if (shadowKey === 'dense') {
				dense = value
			} else if (shadowKey === 'soft') {
				soft = value
			}
		}

		variables.push(`${ name }: ${ dense }, ${ soft };`)
	}

	return variables
}

const createThemeRoot = (variables: ThemeVariables) => {
	const light = variables.schemes.light.join(' ')
	const dark = variables.schemes.dark.join(' ')
	const typography = variables.typography.join(' ')
	const elevations = variables.elevations.join(' ')

	const roots = [] as string[]
	roots.push(`:root { ${ typography } ${ elevations } }`)
	roots.push(`@media (prefers-color-scheme: light) { :root { color-scheme: light; ${ light } } }`)
	roots.push(`@media (prefers-color-scheme: dark) { :root { color-scheme: dark; ${ dark } } }`)
	const root = roots.join(' ')

	return root
}

export const createTheme = (options?: CreateThemeOptions): Theme => {
	const referenceColors = completeObject<ReferenceColorsOptions | undefined, ReferenceColors>(options?.referenceColors, defaultColors)
	const typography = completeObject<TypographyOptions | undefined, Typography>(options?.typography, defaultTypography)
	const elevations = completeObject<ElevationsOptions | undefined, Elevations>(options?.elevations, defaultElevations)

	const palettes = createTonalPalettes(referenceColors)

	const schemes: ColorSchemes = {
		light: createLightScheme(palettes),
		dark: createDarkScheme(palettes),
	}

	const variables: ThemeVariables = {
		schemes: {
			light: parseScheme(schemes.light),
			dark: parseScheme(schemes.dark),
		},
		typography: parseTypography(typography),
		elevations: parseElevations(elevations),
	}

	const root = createThemeRoot(variables)

	const theme: Theme = {
		referenceColors,
		schemes,
		typography,
		elevations,
		root,
	}

	return theme
}
