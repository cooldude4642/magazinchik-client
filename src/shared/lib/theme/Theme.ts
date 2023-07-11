import { Rgba, TonalPalette, argbFromRgba, rgbaFromArgb } from '@material/material-color-utilities'
import { defaultColors, defaultElevations, defaultTypography } from 'shared/config'
import { ColorScheme, ColorSchemes, ColorStates, CreateThemeOptions, Elevation, Elevations, FontGroup, ReferenceColors, Shadow, ThemeRoot, ThemeState, ThemeVariables, TonalPalettes, Typography } from 'shared/types'
import { kebabize } from '../helpers'
import { Font } from 'next/dist/compiled/@vercel/og/satori'

export class Theme implements ThemeState {
	palettes: TonalPalettes
	schemes: ColorSchemes = {
		dark: {} as ColorScheme,
		light: {} as ColorScheme
	}
	typography: Typography
	elevations: Elevations
	referenceColors: ReferenceColors
	variables: ThemeVariables = {
		schemes: {
			light: [] as string[],
			dark: [] as string[]
		},
		typography: [] as string[],
		elevations: [] as string[]
	}
	root: ThemeRoot = {
		light: undefined,
		dark: undefined
	}

	constructor (options: CreateThemeOptions) {
		const { referenceColors, typography, elevations } = options

		this.referenceColors = referenceColors ?? defaultColors
		this.typography = typography ?? defaultTypography
		this.elevations = elevations ?? defaultElevations
		this.createTonalPalettes()
		this.createLightScheme()
		this.createDarkSCheme()
		this.parseLightScheme()
		this.parseDarkScheme()
		this.parseTypography()
		this.parseElevations()
		this.createThemeRoot()
	}

	createTonalPalette = (rgba: Rgba) => {
		const palette = TonalPalette.fromInt(argbFromRgba(rgba))
	
		return palette
	}

	createTonalPalettes = () => {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = this.referenceColors
		const createTonalPalette = this.createTonalPalette
	
		const palettes: TonalPalettes = {
			primary: createTonalPalette(primary),
			secondary: createTonalPalette(secondary),
			tertiary: createTonalPalette(tertiary),
			neutral: createTonalPalette(neutral),
			neutralVariant: createTonalPalette(neutralVariant),
			error: createTonalPalette(error)
		}
	
		this.palettes = palettes
	}

	getTone = (pallete: TonalPalette, tone: number, a: number = 1) => {
		const { r, g, b } = rgbaFromArgb(pallete.tone(tone))
		const rgba: Rgba = { r, g, b, a }
	
		return rgba
	}

	createLightScheme = () => {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = this.palettes
		const getTone = this.getTone

		const light: ColorScheme = {
			primary: getTone(primary, 40),
			onPrimary: {
				enabled: getTone(primary, 100, 1),
				hovered: getTone(primary, 100, 0.08),
				focused: getTone(primary, 100, 0.12),
				pressed: getTone(primary, 100, 0.12),
				draged: getTone(primary, 100, 0.16)
			},
			primaryContainer: getTone(primary, 90),
			onPrimaryContainer: {
				enabled: getTone(primary, 10, 1),
				hovered: getTone(primary, 10, 0.08),
				focused: getTone(primary, 10, 0.12),
				pressed: getTone(primary, 10, 0.12),
				draged: getTone(primary, 10, 0.16)
			},
			secondary: getTone(secondary, 40),
			onSecondary: {
				enabled: getTone(secondary, 100, 1),
				hovered: getTone(secondary, 100, 0.08),
				focused: getTone(secondary, 100, 0.12),
				pressed: getTone(secondary, 100, 0.12),
				draged: getTone(secondary, 100, 0.16)
			},
			secondaryContainer: getTone(secondary, 90),
			onSecondaryContainer: {
				enabled: getTone(secondary, 10, 1),
				hovered: getTone(secondary, 10, 0.08),
				focused: getTone(secondary, 10, 0.12),
				pressed: getTone(secondary, 10, 0.12),
				draged: getTone(secondary, 10, 0.16)
			},
			tertiary: getTone(tertiary, 40),
			onTertiary: {
				enabled: getTone(tertiary, 100, 1),
				hovered: getTone(tertiary, 100, 0.08),
				focused: getTone(tertiary, 100, 0.12),
				pressed: getTone(tertiary, 100, 0.12),
				draged: getTone(tertiary, 100, 0.16)
			},
			tertiaryContainer: getTone(tertiary, 90),
			onTertiaryContainer: {
				enabled: getTone(tertiary, 10, 1),
				hovered: getTone(tertiary, 10, 0.08),
				focused: getTone(tertiary, 10, 0.12),
				pressed: getTone(tertiary, 10, 0.12),
				draged: getTone(tertiary, 10, 0.16)
			},
			error: getTone(error, 40),
			onError: {
				enabled: getTone(error, 100, 1),
				hovered: getTone(error, 100, 0.08),
				focused: getTone(error, 100, 0.12),
				pressed: getTone(error, 100, 0.12),
				draged: getTone(error, 100, 0.16)
			},
			errorContainer: getTone(error, 90),
			onErrorContainer: {
				enabled: getTone(error, 10, 1),
				hovered: getTone(error, 10, 0.08),
				focused: getTone(error, 10, 0.12),
				pressed: getTone(error, 10, 0.12),
				draged: getTone(error, 10, 0.16)
			},
			surface: getTone(neutral, 98),
			surfaceContainerLowest: getTone(neutral, 100),
			surfaceContainerLow: getTone(neutral, 96),
			surfaceContainer: getTone(neutral, 94),
			surfaceContainerHigh: getTone(neutral, 92),
			surfaceContainerHighest: getTone(neutral, 90),
			onSurface: {
				enabled: getTone(neutral, 10, 1),
				hovered: getTone(neutral, 10, 0.08),
				focused: getTone(neutral, 10, 0.12),
				pressed: getTone(neutral, 10, 0.12),
				draged: getTone(neutral, 10, 0.16)
			},
			onSurfaceVariant: {
				enabled: getTone(neutralVariant, 30, 1),
				hovered: getTone(neutralVariant, 30, 0.08),
				focused: getTone(neutralVariant, 30, 0.12),
				pressed: getTone(neutralVariant, 30, 0.12),
				draged: getTone(neutralVariant, 30, 0.16)
			},
			outline: getTone(neutralVariant, 50),
			outlineVariant: getTone(neutralVariant, 80),
			shadowSoft: getTone(neutral, 0),
			shadowDense: getTone(neutral, 0),
			scrim: getTone(neutral, 0),
			inverseSurface: getTone(neutral, 20),
			inverseOnSurface: {
				enabled: getTone(neutral, 95, 1),
				hovered: getTone(neutral, 95, 0.08),
				focused: getTone(neutral, 95, 0.12),
				pressed: getTone(neutral, 95, 0.12),
				draged: getTone(neutral, 95, 0.16)
			},
			inversePrimary: getTone(primary, 80)
		}

		this.schemes.light = light
	}

	createDarkSCheme () {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = this.palettes
		const getTone = this.getTone

		const dark: ColorScheme = {
			primary: getTone(primary, 80),
			onPrimary: {
				enabled: getTone(primary, 20, 1),
				hovered: getTone(primary, 20, 0.08),
				focused: getTone(primary, 20, 0.12),
				pressed: getTone(primary, 20, 0.12),
				draged: getTone(primary, 20, 0.16)
			},
			primaryContainer: getTone(primary, 30),
			onPrimaryContainer: {
				enabled: getTone(primary, 90, 1),
				hovered: getTone(primary, 90, 0.08),
				focused: getTone(primary, 90, 0.12),
				pressed: getTone(primary, 90, 0.12),
				draged: getTone(primary, 90, 0.16)
			},
			secondary: getTone(secondary, 80),
			onSecondary: {
				enabled: getTone(secondary, 20, 1),
				hovered: getTone(secondary, 20, 0.08),
				focused: getTone(secondary, 20, 0.12),
				pressed: getTone(secondary, 20, 0.12),
				draged: getTone(secondary, 20, 0.16)
			},
			secondaryContainer: getTone(secondary, 30),
			onSecondaryContainer: {
				enabled: getTone(secondary, 90, 1),
				hovered: getTone(secondary, 90, 0.08),
				focused: getTone(secondary, 90, 0.12),
				pressed: getTone(secondary, 90, 0.12),
				draged: getTone(secondary, 90, 0.16)
			},
			tertiary: getTone(tertiary, 80),
			onTertiary: {
				enabled: getTone(tertiary, 20, 1),
				hovered: getTone(tertiary, 20, 0.08),
				focused: getTone(tertiary, 20, 0.12),
				pressed: getTone(tertiary, 20, 0.12),
				draged: getTone(tertiary, 20, 0.16)
			},
			tertiaryContainer: getTone(tertiary, 30),
			onTertiaryContainer: {
				enabled: getTone(tertiary, 90, 1),
				hovered: getTone(tertiary, 90, 0.08),
				focused: getTone(tertiary, 90, 0.12),
				pressed: getTone(tertiary, 90, 0.12),
				draged: getTone(tertiary, 90, 0.16)
			},
			error: getTone(error, 80),
			onError: {
				enabled: getTone(error, 20, 1),
				hovered: getTone(error, 20, 0.08),
				focused: getTone(error, 20, 0.12),
				pressed: getTone(error, 20, 0.12),
				draged: getTone(error, 20, 0.16)
			},
			errorContainer: getTone(error, 30),
			onErrorContainer: {
				enabled: getTone(error, 90, 1),
				hovered: getTone(error, 90, 0.08),
				focused: getTone(error, 90, 0.12),
				pressed: getTone(error, 90, 0.12),
				draged: getTone(error, 90, 0.16)
			},
			surface: getTone(neutral, 6),
			surfaceContainerLowest: getTone(neutral, 4),
			surfaceContainerLow: getTone(neutral, 10),
			surfaceContainer: getTone(neutral, 12),
			surfaceContainerHigh: getTone(neutral, 17),
			surfaceContainerHighest: getTone(neutral, 22),
			onSurface: {
				enabled: getTone(neutral, 90, 1),
				hovered: getTone(neutral, 90, 0.08),
				focused: getTone(neutral, 90, 0.12),
				pressed: getTone(neutral, 90, 0.12),
				draged: getTone(neutral, 90, 0.16)
			},
			onSurfaceVariant: {
				enabled: getTone(neutralVariant, 80, 1),
				hovered: getTone(neutralVariant, 80, 0.08),
				focused: getTone(neutralVariant, 80, 0.12),
				pressed: getTone(neutralVariant, 80, 0.12),
				draged: getTone(neutralVariant, 80, 0.16)
			},
			outline: getTone(neutralVariant, 60),
			outlineVariant: getTone(neutralVariant, 30),
			shadowSoft: getTone(neutral, 0),
			shadowDense: getTone(neutral, 0),
			scrim: getTone(neutral, 0),
			inverseSurface: getTone(neutral, 90),
			inverseOnSurface: {
				enabled: getTone(neutral, 20, 1),
				hovered: getTone(neutral, 20, 0.08),
				focused: getTone(neutral, 20, 0.12),
				pressed: getTone(neutral, 20, 0.12),
				draged: getTone(neutral, 20, 0.16)
			},
			inversePrimary: getTone(primary, 40)
		}

		this.schemes.dark = dark
	}

	parseLightScheme () {
		for (const colorKey in this.schemes.light) {
			const element = this.schemes.light[colorKey]

			if (element.r) {
				const { r, g, b, a } = element as Rgba

				const name = `--${ kebabize(colorKey) }`
				const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

				this.variables.schemes.light.push(`${ name }: ${ value };`)
			} else if (element.enabled) {
				const states = element as ColorStates

				for (const stateKey in states) {
					const { r, g, b, a } = states[stateKey] as Rgba

					const name = `--${ kebabize(colorKey) }`
					const state = stateKey !== 'enabled' ? '-' + stateKey : ''
					const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

					this.variables.schemes.light.push(`${ name + state }: ${ value };`)
				}
			}
		}
	}

	parseDarkScheme () {
		for (const colorKey in this.schemes.dark) {
			const element = this.schemes.dark[colorKey]

			if (element.r) {
				const { r, g, b, a } = element as Rgba

				const name = `--${ kebabize(colorKey) }`
				const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

				this.variables.schemes.dark.push(`${ name }: ${ value };`)
			} else if (element.enabled) {
				const states = element as ColorStates

				for (const stateKey in states) {
					const { r, g, b, a } = states[stateKey] as Rgba

					const name = `--${ kebabize(colorKey) }`
					const state = stateKey !== 'enabled' ? '-' + stateKey : ''
					const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

					this.variables.schemes.dark.push(`${ name + state }: ${ value };`)
				}
			}
		}
	}

	parseTypography () {
		for (const typescaleKey in this.typography) {
			const fontGroup = this.typography[typescaleKey] as FontGroup
	
			for (const sizeKey in fontGroup) {
				const font = fontGroup[sizeKey] as Font
				
				for (const propertyKey in font) {
					if (propertyKey === 'fontFamily') {
						const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
						const value = font[propertyKey].join(', ')
						
						this.variables.typography.push(`${ name }: ${ value };`)
					} else if (propertyKey === 'fontSize') {
						const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
						const value = `${ font[propertyKey] }px`
						
						this.variables.typography.push(`${ name }: ${ value };`)
					} else if (propertyKey === 'lineHeight') {
						const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
						const value = `${ font[propertyKey] }px`
						
						this.variables.typography.push(`${ name }: ${ value };`)
					} else if (propertyKey === 'fontWeight') {
						const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
						const value = font[propertyKey]
						
						this.variables.typography.push(`${ name }: ${ value };`)
					} else if (propertyKey === 'letterSpacing') {
						const name = `--${ typescaleKey }-${ sizeKey }-${ kebabize(propertyKey) }`
						const value = `${ font[propertyKey].toFixed(2) }px`
						
						this.variables.typography.push(`${ name }: ${ value };`)
					}
				}
			}
		}
	}

	parseElevations () {
		for (const levelKey in this.elevations) {
			const elevation = this.elevations[levelKey] as Elevation
			let name = `--elevation-${ levelKey }`
	
			let dense: string
			let soft: string
	
			for (const shadowKey in elevation) {
				const { x, y, blur, spread, color: { r, g, b, a } } = elevation[shadowKey] as Shadow
	
				const value = `${ x }px ${ y }px ${ blur }px ${ spread }px rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })` 
				
				if (shadowKey === 'dense') {
					dense = value
				} else if (shadowKey === 'soft') {
					soft = value
				}
			}
	
			this.variables.elevations.push(`${ name }: ${ dense }, ${ soft };`)
		}
	}

	createThemeRoot () {
		const light = this.variables.schemes.light.join(' ')
		const dark = this.variables.schemes.dark.join(' ')
		const typography = this.variables.typography.join(' ')
		const elevations = this.variables.elevations.join(' ')

		this.root.light = `:root { ${ light } ${ typography } ${ elevations } }`
		this.root.dark = `:root { ${ dark } ${ typography } ${ elevations } }`
	}
}