import { Rgba, TonalPalette } from '@material/material-color-utilities'

export interface ThemeState {
	referenceColors: ReferenceColors
	schemes: ColorSchemes
	typography: Typography
	elevations: Elevations
	root: string
}

export interface ColorSchemes {
	light: ColorScheme
	dark: ColorScheme
}

export interface ColorScheme {
	primary: ColorStates
	onPrimary: ColorStates
	primaryContainer: Rgba
	onPrimaryContainer: ColorStates
	secondary: Rgba
	onSecondary: ColorStates
	secondaryContainer: Rgba
	onSecondaryContainer: ColorStates
	tertiary: Rgba
	onTertiary: ColorStates
	tertiaryContainer: Rgba
	onTertiaryContainer: ColorStates
	error: Rgba
	onError: ColorStates
	errorContainer: Rgba
	onErrorContainer: ColorStates
	surface: Rgba
	surfaceContainerLowest: Rgba
	surfaceContainerLow: Rgba
	surfaceContainer: Rgba
	surfaceContainerHigh: Rgba
	surfaceContainerHighest: Rgba
	onSurface: ColorStates
	onSurfaceVariant: ColorStates
	outline: Rgba
	outlineVariant: Rgba
	scrim: Rgba
	inverseSurface: Rgba
	inverseOnSurface: ColorStates
	inversePrimary: Rgba
	shadowSoft: Rgba
	shadowDense: Rgba
}

export interface ColorStates {
	enabled: Rgba
	hovered: Rgba
	focused: Rgba
	pressed: Rgba
	draged: Rgba
}

export interface TonalPalettes {
	primary: TonalPalette
	secondary: TonalPalette
	tertiary: TonalPalette
	neutral: TonalPalette
	neutralVariant: TonalPalette
	error: TonalPalette
}

export interface ReferenceColors {
	primary: Rgba
	secondary: Rgba
	tertiary: Rgba
	neutral: Rgba
	neutralVariant: Rgba
	error: Rgba
}

export interface Typography {
	display?: FontGroup
	headline?: FontGroup
	title?: FontGroup
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
	referenceColors?: Partial<ReferenceColors>
	typography?: Partial<Typography>
	elevations?: Partial<Elevations>
}

export interface ThemeVariables {
	schemes: {
		light: string[]
		dark: string[]
	}
	typography: string[]
	elevations: string[]
}