const {readFileSync} = require('fs')
const {join} = require('path')
const meta = JSON.parse(readFileSync(require.resolve(join('debug', 'package.json')), 'utf-8'))
module.exports = require(join('debug', meta.browser))
