const mapValues = require('lodash.mapvalues')
const { getContrast } = require('polished')

function getLightContrast(colour, background, threshold = 7) {
	return (
		colour.find(shade => getContrast(background, shade) >= threshold) ||
		colour.darkest
	)
}

function getDarkContrast(colour, background, threshold = 7) {
	return (
		[...colour]
			.reverse()
			.find(shade => getContrast(background, shade) >= threshold) ||
		colour.lightest
	)
}

function getLight(colour, baseBackground) {
	const background = getDarkContrast(
		colour.background || colour.colour || colour,
		baseBackground,
		1.05,
	)

	const foreground = (colour.maximiseContrast
		? getLightContrast
		: getDarkContrast)(colour.foreground || colour.colour || colour, background)

	return { background, foreground }
}

function getDark(colour, baseBackground) {
	const background = getLightContrast(
		colour.background || colour.colour || colour,
		baseBackground,
		1.05,
	)

	const foreground = (colour.maximiseContrast
		? getDarkContrast
		: getLightContrast)(
		colour.foreground || colour.colour || colour,
		background,
	)

	return { background, foreground }
}

module.exports = (base, scheme) => {
	const lightBackground = (base.background || base).lightest
	const darkBackground = (base.background || base).darkest
	const lightForeground = (base.foreground || base).darkest
	const darkForeground = (base.foreground || base).lightest

	return {
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
