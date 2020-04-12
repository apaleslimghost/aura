const kebabCase = require('kebab-case')
const { hex2xterm } = require('color2xterm')
const fs = require('fs')

const mappings = {
	main: ['Normal'],
	keyword: [],
	variable: [],
	function: [],
	literal: [],
	string: [],
	operator: [],
	type: [],
	comment: [],
}

const renderColour = (colour, name) =>
	mappings[name].map(
		highlight =>
			`highlight ${highlight} guifg=${colour.foreground} guibg=${
				colour.background
			} ctermfg=${hex2xterm(colour.foreground)} ctermbg=${hex2xterm(
				colour.background,
			)}`,
	)

const renderColours = colours =>
	Object.keys(colours).flatMap(name => renderColour(colours[name], name))

const renderFile = (name, colours, dark) => `
highlight clear
set background=${dark ? 'dark' : 'light'}
set t_Co=256
let g:colors_name = '${kebabCase(name)}-${dark ? 'dark' : 'light'}'

${renderColours(colours).join('\n')}
`

module.exports = scheme => {
	fs.mkdirSync('colors')
	fs.writeFileSync(
		`colors/${kebabCase(scheme.name)}-dark.vim`,
		renderFile(scheme.name, scheme.dark, true),
	)
	fs.writeFileSync(
		`colors/${kebabCase(scheme.name)}-light.vim`,
		renderFile(scheme.name, scheme.light, false),
	)
}
