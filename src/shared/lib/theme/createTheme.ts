import { Rgba, TonalPalette, argbFromRgba, rgbaFromArgb } from '@material/material-color-utilities'
import { defaultColors, defaultElevations, defaultTypography } from 'shared/config'
import { ReferenceColors, Palettes, Scheme, Schemes, Theme, CreateThemeOptions } from 'shared/types'

const createPalette = (rgba: Rgba) => {
	const palette = TonalPalette.fromInt(argbFromRgba(rgba))

	return palette
}

const createPalettes = (colors?: ReferenceColors) => {
	const { primary, secondary, tertiary, neutral, neutralVariant, error } = colors

	const palettes: Palettes = {
		primary: createPalette(primary ?? defaultColors.primary),
		secondary: createPalette(secondary ?? defaultColors.secondary),
		tertiary: createPalette(tertiary ?? defaultColors.tertiary),
		neutral: createPalette(neutral ?? defaultColors.neutral),
		neutralVariant: createPalette(neutralVariant ?? defaultColors.neutralVariant),
		error: createPalette(error ?? defaultColors.error)
	}

	return palettes
}

const getTone = (pallete: TonalPalette, tone: number, alpha: number = 1) => {
	const { r, g, b } = rgbaFromArgb(pallete.tone(tone))

	const rgba: Rgba = { r, g, b, a: alpha }

	return rgba
}

const createSchemes = (palletes: Palettes) => {
	const { primary, secondary, tertiary, neutral, neutralVariant, error } = palletes

	const light: Scheme = {
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

	const dark: Scheme = {
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

	const schemes: Schemes = { light, dark }

	return schemes
}

export const createTheme = (options: CreateThemeOptions) => {
	const { colors, typography, elevations } = options
	const palettes = createPalettes(colors ?? defaultColors)
	const schemes = createSchemes(palettes)

	const theme: Theme = {
		schemes: schemes,
		typography: typography ?? defaultTypography,
		elevations: elevations ?? defaultElevations
	}

	return theme
}