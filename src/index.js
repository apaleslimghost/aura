const mapValues = require('lodash.mapvalues')
const { getContrast } = require('polished')

function getLightContrast(colour, background, threshold = 7) {
	return (
		colour.find(shade => getContrast(background, shade) >= threshold) ||
		colour.lightest
	)
}

function getDarkContrast(colour, background, threshold = 7) {
	return (
		[...colour]
			.reverse()
			.find(shade => getContrast(background, shade) >= threshold) ||
		colour.darkest
	)
}

function getLight(colour, baseBackground) {
	const background =
		colour.background === false
			? false
			: getDarkContrast(
					colour.background || colour.colour || colour,
					baseBackground,
					colour.backgroundContrast || 1.05,
			  )

	const foreground =
		colour.foreground === false
			? false
			: getDarkContrast(
					colour.foreground || colour.colour || colour,
					background || baseBackground,
					colour.contrast,
			  )

	return { background, foreground }
}

function getDark(colour, baseBackground) {
	const background =
		colour.background === false
			? false
			: getLightContrast(
					colour.background || colour.colour || colour,
					baseBackground,
					colour.backgroundContrast || 1.05,
			  )

	const foreground =
		colour.foreground === false
			? false
			: getLightContrast(
					colour.foreground || colour.colour || colour,
					background || baseBackground,
					colour.contrast,
			  )

	return { background, foreground }
}

module.exports = (base, scheme) => {
	const lightBackground = base.background.lightest
	const darkBackground = base.background.darkest
	const lightForeground = base.foreground.darkest
	const darkForeground = base.foreground.lightest

	return {
		...base,
		dark: {
			...mapValues(scheme, colour => getDark(colour, darkBackground)),
			main: {
				foreground: darkForeground,
				background: darkBackground,
			},
		},
		light: {
			...mapValues(scheme, colour => getLight(colour, lightBackground)),
			main: {
				foreground: lightForeground,
				background: lightBackground,
			},
		},
	}
}
