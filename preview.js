// eslint-env browser

const schemes = require('./themes/aura.js')
const { meetsContrastGuidelines, readableColor } = require('polished')

const main = document.querySelector('main')

for (const type of ['dark', 'light']) {
	const scheme = schemes[type]
	const container = document.createElement('div')
	container.style.background = scheme.main.background
	container.style.padding = '1ex'
	container.style.marginBottom = '1ex'
	main.appendChild(container)

	for (const [name, { background, foreground }] of Object.entries(scheme)) {
		const div = document.createElement('div')
		const { AAA } = meetsContrastGuidelines(
			foreground || readableColor(background || scheme.main.background),
			background || scheme.main.background,
		)
		div.innerHTML = name + (AAA ? '✓' : '✗')
		div.style.color =
			foreground || readableColor(background || scheme.main.background)
		background && (div.style.background = background)
		div.style.display = 'inline-block'
		div.style.marginRight = '1ex'
		container.appendChild(div)
	}
}

main.style.lineHeight = 1.6
main.style.fontFamily = 'Iosevka'
main.style.fontWeight = 400
main.style.fontSize = '13px'
