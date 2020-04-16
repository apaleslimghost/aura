const aura = require('../')
const colours = require('@apaleslimghost/colours')

module.exports = aura(
	{
		name: 'aura',
		background: colours.carbon,
		foreground: colours.steel,
	},
	{
		keyword: { colour: colours.fuchsia, contrast: 5 },
		variable: {
			colour: colours.ocean,
			backgroundContrast: 1,
		},
		function: colours.lime,
		literal: {
			colour: colours.ink,
			backgroundContrast: 1.15,
		},
		string: {
			colour: colours.lemon,
			contrast: 12,
		},
		operator: {
			colour: colours.amber,
			contrast: 5,
		},
		type: colours.aqua,
		comment: colours.carbon,
		whitespace: {
			foreground: colours.carbon,
			background: false,
			contrast: 1.2,
		},
		noise: {
			foreground: colours.carbon,
			background: false,
			contrast: 3,
		},
		ui: {
			background: colours.carbon,
			foreground: false,
			contrast: 4,
		},
	},
)
