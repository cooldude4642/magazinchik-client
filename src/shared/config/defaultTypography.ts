import { Typography } from 'shared/lib/theme'

const defaultFontFamily = ['Montserrat', 'Roboto', 'Sans-Serif']

export const defaultTypography: Typography = {
	display: {
		large: {
			fontFamily: defaultFontFamily,
			fontSize: 57,
			lineHeight: 64,
			fontWeight: 400,
			letterSpacing: -0.25
		},
		medium: {
			fontFamily: defaultFontFamily,
			fontSize: 45,
			lineHeight: 52,
			fontWeight: 400,
			letterSpacing: 0
		},
		small: {
			fontFamily: defaultFontFamily,
			fontSize: 36,
			lineHeight: 44,
			fontWeight: 400,
			letterSpacing: 0
		}
	},
	headline: {
		large: {
			fontFamily: defaultFontFamily,
			fontSize: 32,
			lineHeight: 40,
			fontWeight: 400,
			letterSpacing: 0
		},
		medium: {
			fontFamily: defaultFontFamily,
			fontSize: 28,
			lineHeight: 36,
			fontWeight: 400,
			letterSpacing: 0
		},
		small: {
			fontFamily: defaultFontFamily,
			fontSize: 24,
			lineHeight: 32,
			fontWeight: 400,
			letterSpacing: 0
		}
	},
	title: {
		large: {
			fontFamily: defaultFontFamily,
			fontSize: 22,
			lineHeight: 28,
			fontWeight: 400,
			letterSpacing: 0
		},
		medium: {
			fontFamily: defaultFontFamily,
			fontSize: 16,
			lineHeight: 24,
			fontWeight: 500,
			letterSpacing: 0.15
		},
		small: {
			fontFamily: defaultFontFamily,
			fontSize: 14,
			lineHeight: 20,
			fontWeight: 500,
			letterSpacing: 0.1
		}
	},
	label: {
		large: {
			fontFamily: defaultFontFamily,
			fontSize: 14,
			lineHeight: 20,
			fontWeight: 500,
			letterSpacing: 0.1
		},
		medium: {
			fontFamily: defaultFontFamily,
			fontSize: 12,
			lineHeight: 16,
			fontWeight: 500,
			letterSpacing: 0.5
		},
		small: {
			fontFamily: defaultFontFamily,
			fontSize: 11,
			lineHeight: 16,
			fontWeight: 500,
			letterSpacing: 0.5
		}
	},
	body: {
		large: {
			fontFamily: defaultFontFamily,
			fontSize: 16,
			lineHeight: 24,
			fontWeight: 400,
			letterSpacing: 0.5
		},
		medium: {
			fontFamily: defaultFontFamily,
			fontSize: 14,
			lineHeight: 20,
			fontWeight: 400,
			letterSpacing: 0.25
		},
		small: {
			fontFamily: defaultFontFamily,
			fontSize: 12,
			lineHeight: 16,
			fontWeight: 400,
			letterSpacing: 0.4
		}
	}
}