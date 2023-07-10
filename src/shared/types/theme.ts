import { Rgba, TonalPalette } from '@material/material-color-utilities'

export interface Theme {
	schemes: Schemes
	typography: Typography
	elevations: Elevations
}

export interface Schemes {
	light: Scheme
	dark: Scheme
}

export interface Scheme {
	primary: Rgba
	onPrimary: States
	primaryContainer: Rgba
	onPrimaryContainer: States
	secondary: Rgba
	onSecondary: States
	secondaryContainer: Rgba
	onSecondaryContainer: States
	tertiary: Rgba
	onTertiary: States
	tertiaryContainer: Rgba
	onTertiaryContainer: States
	error: Rgba
	onError: States
	errorContainer: Rgba
	onErrorContainer: States
	surface: Rgba
	surfaceContainerLowest: Rgba
	surfaceContainerLow: Rgba
	surfaceContainer: Rgba
	surfaceContainerHigh: Rgba
	surfaceContainerHighest: Rgba
	onSurface: States
	onSurfaceVariant: States
	outline: Rgba
	outlineVariant: Rgba
	scrim: Rgba
	inverseSurface: Rgba
	inverseOnSurface: States
	inversePrimary: Rgba
	shadowSoft: Rgba
	shadowDense: Rgba
}

export interface States {
	enabled: Rgba
	hovered: Rgba
	focused: Rgba
	pressed: Rgba
	draged: Rgba
}

export interface Palettes {
	primary: TonalPalette
	secondary: TonalPalette
	tertiary: TonalPalette
	neutral: TonalPalette
	neutralVariant: TonalPalette
	error: TonalPalette
}

export interface ReferenceColors {
	primary?: Rgba
	secondary?: Rgba
	tertiary?: Rgba
	neutral?: Rgba
	neutralVariant?: Rgba
	error?: Rgba
}

export interface Typography {
	display: FontGroup
	headline: FontGroup
	title: FontGroup
	label: FontGroup
	body: FontGroup
}

export interface FontGroup {
	large: Font
	medium: Font
	small: Font
}

export interface Font {
	fontFamily: string[]
	fontSize: number
	lineHeight: number
	fontWeight: fontWeight
	letterSpacing: number
}

export type fontWeight = 400 | 500 | 700 | 900

export interface Elevations {
	lowest: Elevation
	low: Elevation
	medium: Elevation
	high: Elevation
	highest: Elevation
}

export interface Elevation {
	soft: Shadow
	dense: Shadow
}

export interface Shadow {
	x: number
	y: number
	blur: number
	spread: number
	color: Rgba
}

export interface CreateThemeOptions {
	colors?: ReferenceColors
	typography?: Typography
	elevations?: Elevations
}

export interface ThemeVariables {
	schemes: {
		light: string[]
		dark: string[]
	}
	typography: string[]
	elevations: string[]
}

export interface ThemeRoot {
	scheme: {
		light: string
		dark: string
	}
	typography: string
	elevations: string
}