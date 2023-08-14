import { Elevations } from 'shared/lib/theme/types'

export const defaultElevations: Elevations = {
	lowest: {
		dense: {
			x: 0,
			y: 1,
			blur: 2,
			spread: 0,
			color: { r: 0, g: 0, b: 0, a: 0.3 }
		},
		soft: {
			x: 0,
			y: 1,
			blur: 3,
			spread: 1,
			color: { r: 0, g: 0, b: 0, a: 0.15 }
		}
	},
	low: {
		dense: {
			x: 0,
			y: 1,
			blur: 2,
			spread: 0,
			color: { r: 0, g: 0, b: 0, a: 0.3 }
		},
		soft: {
			x: 0,
			y: 2,
			blur: 6,
			spread: 2,
			color: { r: 0, g: 0, b: 0, a: 0.15 }
		}
	},
	medium: {
		dense: {
			x: 0,
			y: 1,
			blur: 3,
			spread: 0,
			color: { r: 0, g: 0, b: 0, a: 0.3 }
		},
		soft: {
			x: 0,
			y: 4,
			blur: 8,
			spread: 3,
			color: { r: 0, g: 0, b: 0, a: 0.15 }
		}
	},
	high: {
		dense: {
			x: 0,
			y: 2,
			blur: 3,
			spread: 0,
			color: { r: 0, g: 0, b: 0, a: 0.3 }
		},
		soft: {
			x: 0,
			y: 6,
			blur: 10,
			spread: 4,
			color: { r: 0, g: 0, b: 0, a: 0.15 }
		}
	},
	highest: {
		dense: {
			x: 0,
			y: 4,
			blur: 4,
			spread: 0,
			color: { r: 0, g: 0, b: 0, a: 0.3 }
		},
		soft: {
			x: 0,
			y: 8,
			blur: 12,
			spread: 6,
			color: { r: 0, g: 0, b: 0, a: 0.15 }
		}
	}
}