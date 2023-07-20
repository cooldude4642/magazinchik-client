import { Rgba, TonalPalette, argbFromRgba, rgbaFromArgb } from '@material/material-color-utilities'
import { defaultColors, defaultElevations, defaultTypography } from 'shared/config'
import {
	ColorScheme, ColorSchemes, ColorStates, CreateThemeOptions, Elevation, Elevations, FontGroup,
	ReferenceColors, Shadow, ThemeRoot, ThemeState, ThemeVariables, TonalPalettes, Typography
} from './types'
import { kebabize } from '../helpers'
import { Font } from 'next/dist/compiled/@vercel/og/satori'

export class Theme {
	static CreateTheme (options?: CreateThemeOptions): ThemeState {
		const referenceColors = options?.referenceColors ? this.CompleteReferenceColors(options.referenceColors) : defaultColors
		const typography = options?.typography ? this.CompleteTypography(options.typography) : defaultTypography
		const elevations = options?.elevations ? this.CompleteElevations(options.elevations) : defaultElevations

		const palettes = this.CreateTonalPalettes(referenceColors)

		const schemes: ColorSchemes = {
			light: this.CreateLightScheme(palettes),
			dark: this.CreateDarkScheme(palettes)
		}

		const variables: ThemeVariables = {
			schemes: {
				light: this.ParseScheme(schemes.light),
				dark: this.ParseScheme(schemes.dark)
			},
			typography: this.ParseTypography(typography as Typography),
			elevations: this.ParseElevations(elevations as Elevations)
		}

		const root = this.CreateThemeRoot(variables)

		const theme: ThemeState = {
			referenceColors,
			schemes,
			typography,
			elevations,
			root
		}

		return theme
	}

	private static CompleteReferenceColors (referenceColors: Partial<ReferenceColors>) {
		const completedReferenceColors: ReferenceColors = {
			primary: referenceColors?.primary ?? defaultColors.primary,
			secondary: referenceColors?.secondary ?? defaultColors.secondary,
			tertiary: referenceColors?.tertiary ?? defaultColors.tertiary,
			error: referenceColors?.error ?? defaultColors.error,
			neutral: referenceColors?.neutral ?? defaultColors.neutral,
			neutralVariant: referenceColors?.neutralVariant ?? defaultColors.neutralVariant
		}

		return completedReferenceColors as ReferenceColors
	}

	private static CompleteTypography (typography: Partial<Typography>) {
		const completedTypography: Typography = {
			display: {
				large: {
					fontFamily: typography?.display?.large?.fontFamily ?? defaultTypography.display.large.fontFamily,
					fontSize: typography?.display?.large?.fontSize ?? defaultTypography.display.large.fontSize,
					lineHeight: typography?.display?.large?.lineHeight ?? defaultTypography.display.large.lineHeight,
					fontWeight: typography?.display?.large?.fontWeight ?? defaultTypography.display.large.fontWeight,
					letterSpacing: typography?.display?.large?.letterSpacing ?? defaultTypography.display.large.letterSpacing,
				},
				medium: {
					fontFamily: typography?.display?.medium?.fontFamily ?? defaultTypography.display.medium.fontFamily,
					fontSize: typography?.display?.medium?.fontSize ?? defaultTypography.display.medium.fontSize,
					lineHeight: typography?.display?.medium?.lineHeight ?? defaultTypography.display.medium.lineHeight,
					fontWeight: typography?.display?.medium?.fontWeight ?? defaultTypography.display.medium.fontWeight,
					letterSpacing: typography?.display?.medium?.letterSpacing ?? defaultTypography.display.medium.letterSpacing,
				},
				small: {
					fontFamily: typography?.display?.small?.fontFamily ?? defaultTypography.display.small.fontFamily,
					fontSize: typography?.display?.small?.fontSize ?? defaultTypography.display.small.fontSize,
					lineHeight: typography?.display?.small?.lineHeight ?? defaultTypography.display.small.lineHeight,
					fontWeight: typography?.display?.small?.fontWeight ?? defaultTypography.display.small.fontWeight,
					letterSpacing: typography?.display?.small?.letterSpacing ?? defaultTypography.display.small.letterSpacing,
				}
			},
			headline: {
				large: {
					fontFamily: typography?.headline?.large?.fontFamily ?? defaultTypography.headline.large.fontFamily,
					fontSize: typography?.headline?.large?.fontSize ?? defaultTypography.headline.large.fontSize,
					lineHeight: typography?.headline?.large?.lineHeight ?? defaultTypography.headline.large.lineHeight,
					fontWeight: typography?.headline?.large?.fontWeight ?? defaultTypography.headline.large.fontWeight,
					letterSpacing: typography?.headline?.large?.letterSpacing ?? defaultTypography.headline.large.letterSpacing,
				},
				medium: {
					fontFamily: typography?.headline?.medium?.fontFamily ?? defaultTypography.headline.medium.fontFamily,
					fontSize: typography?.headline?.medium?.fontSize ?? defaultTypography.headline.medium.fontSize,
					lineHeight: typography?.headline?.medium?.lineHeight ?? defaultTypography.headline.medium.lineHeight,
					fontWeight: typography?.headline?.medium?.fontWeight ?? defaultTypography.headline.medium.fontWeight,
					letterSpacing: typography?.headline?.medium?.letterSpacing ?? defaultTypography.headline.medium.letterSpacing,
				},
				small: {
					fontFamily: typography?.headline?.small?.fontFamily ?? defaultTypography.headline.small.fontFamily,
					fontSize: typography?.headline?.small?.fontSize ?? defaultTypography.headline.small.fontSize,
					lineHeight: typography?.headline?.small?.lineHeight ?? defaultTypography.headline.small.lineHeight,
					fontWeight: typography?.headline?.small?.fontWeight ?? defaultTypography.headline.small.fontWeight,
					letterSpacing: typography?.headline?.small?.letterSpacing ?? defaultTypography.headline.small.letterSpacing,
				}
			},
			title: {
				large: {
					fontFamily: typography?.title?.large?.fontFamily ?? defaultTypography.title.large.fontFamily,
					fontSize: typography?.title?.large?.fontSize ?? defaultTypography.title.large.fontSize,
					lineHeight: typography?.title?.large?.lineHeight ?? defaultTypography.title.large.lineHeight,
					fontWeight: typography?.title?.large?.fontWeight ?? defaultTypography.title.large.fontWeight,
					letterSpacing: typography?.title?.large?.letterSpacing ?? defaultTypography.title.large.letterSpacing,
				},
				medium: {
					fontFamily: typography?.title?.medium?.fontFamily ?? defaultTypography.title.medium.fontFamily,
					fontSize: typography?.title?.medium?.fontSize ?? defaultTypography.title.medium.fontSize,
					lineHeight: typography?.title?.medium?.lineHeight ?? defaultTypography.title.medium.lineHeight,
					fontWeight: typography?.title?.medium?.fontWeight ?? defaultTypography.title.medium.fontWeight,
					letterSpacing: typography?.title?.medium?.letterSpacing ?? defaultTypography.title.medium.letterSpacing,
				},
				small: {
					fontFamily: typography?.title?.small?.fontFamily ?? defaultTypography.title.small.fontFamily,
					fontSize: typography?.title?.small?.fontSize ?? defaultTypography.title.small.fontSize,
					lineHeight: typography?.title?.small?.lineHeight ?? defaultTypography.title.small.lineHeight,
					fontWeight: typography?.title?.small?.fontWeight ?? defaultTypography.title.small.fontWeight,
					letterSpacing: typography?.title?.small?.letterSpacing ?? defaultTypography.title.small.letterSpacing,
				}
			},
			label: {
				large: {
					fontFamily: typography?.label?.large?.fontFamily ?? defaultTypography.label.large.fontFamily,
					fontSize: typography?.label?.large?.fontSize ?? defaultTypography.label.large.fontSize,
					lineHeight: typography?.label?.large?.lineHeight ?? defaultTypography.label.large.lineHeight,
					fontWeight: typography?.label?.large?.fontWeight ?? defaultTypography.label.large.fontWeight,
					letterSpacing: typography?.label?.large?.letterSpacing ?? defaultTypography.label.large.letterSpacing,
				},
				medium: {
					fontFamily: typography?.label?.medium?.fontFamily ?? defaultTypography.label.medium.fontFamily,
					fontSize: typography?.label?.medium?.fontSize ?? defaultTypography.label.medium.fontSize,
					lineHeight: typography?.label?.medium?.lineHeight ?? defaultTypography.label.medium.lineHeight,
					fontWeight: typography?.label?.medium?.fontWeight ?? defaultTypography.label.medium.fontWeight,
					letterSpacing: typography?.label?.medium?.letterSpacing ?? defaultTypography.label.medium.letterSpacing,
				},
				small: {
					fontFamily: typography?.label?.small?.fontFamily ?? defaultTypography.label.small.fontFamily,
					fontSize: typography?.label?.small?.fontSize ?? defaultTypography.label.small.fontSize,
					lineHeight: typography?.label?.small?.lineHeight ?? defaultTypography.label.small.lineHeight,
					fontWeight: typography?.label?.small?.fontWeight ?? defaultTypography.label.small.fontWeight,
					letterSpacing: typography?.label?.small?.letterSpacing ?? defaultTypography.label.small.letterSpacing,
				}
			},
			body: {
				large: {
					fontFamily: typography?.body?.large?.fontFamily ?? defaultTypography.body.large.fontFamily,
					fontSize: typography?.body?.large?.fontSize ?? defaultTypography.body.large.fontSize,
					lineHeight: typography?.body?.large?.lineHeight ?? defaultTypography.body.large.lineHeight,
					fontWeight: typography?.body?.large?.fontWeight ?? defaultTypography.body.large.fontWeight,
					letterSpacing: typography?.body?.large?.letterSpacing ?? defaultTypography.body.large.letterSpacing,
				},
				medium: {
					fontFamily: typography?.body?.medium?.fontFamily ?? defaultTypography.body.medium.fontFamily,
					fontSize: typography?.body?.medium?.fontSize ?? defaultTypography.body.medium.fontSize,
					lineHeight: typography?.body?.medium?.lineHeight ?? defaultTypography.body.medium.lineHeight,
					fontWeight: typography?.body?.medium?.fontWeight ?? defaultTypography.body.medium.fontWeight,
					letterSpacing: typography?.body?.medium?.letterSpacing ?? defaultTypography.body.medium.letterSpacing,
				},
				small: {
					fontFamily: typography?.body?.small?.fontFamily ?? defaultTypography.body.small.fontFamily,
					fontSize: typography?.body?.small?.fontSize ?? defaultTypography.body.small.fontSize,
					lineHeight: typography?.body?.small?.lineHeight ?? defaultTypography.body.small.lineHeight,
					fontWeight: typography?.body?.small?.fontWeight ?? defaultTypography.body.small.fontWeight,
					letterSpacing: typography?.body?.small?.letterSpacing ?? defaultTypography.body.small.letterSpacing,
				}
			}
		}

		return completedTypography
	}

	private static CompleteElevations (elevations: Partial<Elevations>) {
		const completedElevations = {
			lowest: {
				soft: {
					x: elevations?.lowest?.soft?.x ?? defaultElevations.lowest.soft.x,
					y: elevations?.lowest?.soft?.y ?? defaultElevations.lowest.soft.y,
					blur: elevations?.lowest?.soft?.blur ?? defaultElevations.lowest.soft.blur,
					spread: elevations?.lowest?.soft?.spread ?? defaultElevations.lowest.soft.spread,
					color: elevations?.lowest?.soft?.color ?? defaultElevations.lowest.soft.color
				},
				dense: {
					x: elevations?.lowest?.dense?.x ?? defaultElevations.lowest.dense.x,
					y: elevations?.lowest?.dense?.y ?? defaultElevations.lowest.dense.y,
					blur: elevations?.lowest?.dense?.blur ?? defaultElevations.lowest.dense.blur,
					spread: elevations?.lowest?.dense?.spread ?? defaultElevations.lowest.dense.spread,
					color: elevations?.lowest?.dense?.color ?? defaultElevations.lowest.dense.color
				}
			},
			low: {
				soft: {
					x: elevations?.low?.soft?.x ?? defaultElevations.low.soft.x,
					y: elevations?.low?.soft?.y ?? defaultElevations.low.soft.y,
					blur: elevations?.low?.soft?.blur ?? defaultElevations.low.soft.blur,
					spread: elevations?.low?.soft?.spread ?? defaultElevations.low.soft.spread,
					color: elevations?.low?.soft?.color ?? defaultElevations.low.soft.color
				},
				dense: {
					x: elevations?.low?.dense?.x ?? defaultElevations.low.dense.x,
					y: elevations?.low?.dense?.y ?? defaultElevations.low.dense.y,
					blur: elevations?.low?.dense?.blur ?? defaultElevations.low.dense.blur,
					spread: elevations?.low?.dense?.spread ?? defaultElevations.low.dense.spread,
					color: elevations?.low?.dense?.color ?? defaultElevations.low.dense.color
				}
			},
			medium: {
				soft: {
					x: elevations?.medium?.soft?.x ?? defaultElevations.medium.soft.x,
					y: elevations?.medium?.soft?.y ?? defaultElevations.medium.soft.y,
					blur: elevations?.medium?.soft?.blur ?? defaultElevations.medium.soft.blur,
					spread: elevations?.medium?.soft?.spread ?? defaultElevations.medium.soft.spread,
					color: elevations?.medium?.soft?.color ?? defaultElevations.medium.soft.color
				},
				dense: {
					x: elevations?.medium?.dense?.x ?? defaultElevations.medium.dense.x,
					y: elevations?.medium?.dense?.y ?? defaultElevations.medium.dense.y,
					blur: elevations?.medium?.dense?.blur ?? defaultElevations.medium.dense.blur,
					spread: elevations?.medium?.dense?.spread ?? defaultElevations.medium.dense.spread,
					color: elevations?.medium?.dense?.color ?? defaultElevations.medium.dense.color
				}
			},
			high: {
				soft: {
					x: elevations?.high?.soft?.x ?? defaultElevations.high.soft.x,
					y: elevations?.high?.soft?.y ?? defaultElevations.high.soft.y,
					blur: elevations?.high?.soft?.blur ?? defaultElevations.high.soft.blur,
					spread: elevations?.high?.soft?.spread ?? defaultElevations.high.soft.spread,
					color: elevations?.high?.soft?.color ?? defaultElevations.high.soft.color
				},
				dense: {
					x: elevations?.high?.dense?.x ?? defaultElevations.high.dense.x,
					y: elevations?.high?.dense?.y ?? defaultElevations.high.dense.y,
					blur: elevations?.high?.dense?.blur ?? defaultElevations.high.dense.blur,
					spread: elevations?.high?.dense?.spread ?? defaultElevations.high.dense.spread,
					color: elevations?.high?.dense?.color ?? defaultElevations.high.dense.color
				}
			},
			highest: {
				soft: {
					x: elevations?.highest?.soft?.x ?? defaultElevations.highest.soft.x,
					y: elevations?.highest?.soft?.y ?? defaultElevations.highest.soft.y,
					blur: elevations?.highest?.soft?.blur ?? defaultElevations.highest.soft.blur,
					spread: elevations?.highest?.soft?.spread ?? defaultElevations.highest.soft.spread,
					color: elevations?.highest?.soft?.color ?? defaultElevations.highest.soft.color
				},
				dense: {
					x: elevations?.highest?.dense?.x ?? defaultElevations.highest.dense.x,
					y: elevations?.highest?.dense?.y ?? defaultElevations.highest.dense.y,
					blur: elevations?.highest?.dense?.blur ?? defaultElevations.highest.dense.blur,
					spread: elevations?.highest?.dense?.spread ?? defaultElevations.highest.dense.spread,
					color: elevations?.highest?.dense?.color ?? defaultElevations.highest.dense.color
				}
			}
		}

		return completedElevations
	}

	private static CreateTonalPalette = (rgba: Rgba) => {
		const palette = TonalPalette.fromInt(argbFromRgba(rgba))
	
		return palette
	}

	private static CreateTonalPalettes = (referenceColors: ReferenceColors) => {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = referenceColors
		const createTonalPalette = this.CreateTonalPalette
	
		const palettes: TonalPalettes = {
			primary: createTonalPalette(primary),
			secondary: createTonalPalette(secondary),
			tertiary: createTonalPalette(tertiary),
			neutral: createTonalPalette(neutral),
			neutralVariant: createTonalPalette(neutralVariant),
			error: createTonalPalette(error)
		}
	
		return palettes
	}

	private static GetTone = (pallete: TonalPalette, tone: number, a: number = 1) => {
		const { r, g, b } = rgbaFromArgb(pallete.tone(tone))
		const rgba: Rgba = { r, g, b, a }
	
		return rgba
	}

	private static CreateLightScheme = (palletes: TonalPalettes) => {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = palletes
		const getTone = this.GetTone

		const lightScheme: ColorScheme = {
			primary: {
				enabled: getTone(primary, 40, 1),
				hovered: getTone(primary, 40, 0.08),
				focused: getTone(primary, 40, 0.12),
				pressed: getTone(primary, 40, 0.12),
				draged: getTone(primary, 40, 0.16)
			},
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

		return lightScheme
	}

	private static CreateDarkScheme (palettes: TonalPalettes) {
		const { primary, secondary, tertiary, neutral, neutralVariant, error } = palettes
		const getTone = this.GetTone

		const darkScheme: ColorScheme = {
			primary: {
				enabled: getTone(primary, 80, 1),
				hovered: getTone(primary, 80, 0.08),
				focused: getTone(primary, 80, 0.12),
				pressed: getTone(primary, 80, 0.12),
				draged: getTone(primary, 80, 0.16)
			},
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

		return darkScheme
	}

	private static ParseScheme (scheme: ColorScheme) {
		const variables = [] as string[]

		for (const colorKey in scheme) {
			const element = scheme[colorKey]

			if (element.r) {
				const { r, g, b, a } = element as Rgba

				const name = `--${ kebabize(colorKey) }`
				const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

				variables.push(`${ name }: ${ value };`)
			} else if (element.enabled) {
				const states = element as ColorStates

				for (const stateKey in states) {
					const { r, g, b, a } = states[stateKey] as Rgba

					const name = `--${ kebabize(colorKey) }`
					const state = stateKey !== 'enabled' ? '-' + stateKey : ''
					const value = `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`

					variables.push(`${ name + state }: ${ value };`)
				}
			}
		}

		return variables
	}

	private static ParseTypography (typography: Typography) {
		const variables = [] as string[]

		for (const typescaleKey in typography) {
			const fontGroup = typography[typescaleKey] as FontGroup
	
			for (const sizeKey in fontGroup) {
				const font = fontGroup[sizeKey] as Font
				
				for (const propertyKey in font) {
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

	private static ParseElevations (elevations: Elevations) {
		const variables = [] as string[]

		for (const levelKey in elevations) {
			const elevation = elevations[levelKey] as Elevation
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
	
			variables.push(`${ name }: ${ dense }, ${ soft };`)
		}

		return variables
	}

	private static CreateThemeRoot (variables: ThemeVariables) {
		const light = variables.schemes.light.join(' ')
		const dark = variables.schemes.dark.join(' ')
		const typography = variables.typography.join(' ')
		const elevations = variables.elevations.join(' ')

		const root: ThemeRoot = {
			light: `:root { ${ light } ${ typography } ${ elevations } }`,
			dark: `:root { ${ dark } ${ typography } ${ elevations } }`
		}

		return root
	}
}