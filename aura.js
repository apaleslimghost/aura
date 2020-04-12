const aura = require('./')
const colours = require('@apaleslimghost/colours')

module.exports = aura(
	{
		background: colours.carbon,
		foreground: colours.steel,
	},
	{
		keyword: colours.fuchsia,
		variable: colours.sky,
		function: colours.lime,
		literal: colours.ink,
		string: {
			colour: colours.lemon,
			maximiseContrast: true,
		},
		operator: colours.amber,
		type: colours.aqua,
		comment: colours.steel,
	},
)
