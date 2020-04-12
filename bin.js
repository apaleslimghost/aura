const renderers = require('./render')

const theme = require(process.argv[2])

renderers.forEach(renderer => renderer(theme))
