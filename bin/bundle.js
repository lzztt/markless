/* eslint no-console: 'off' */

const fs = require('fs')
const rollup = require('rollup').rollup
const babel = require('babel-core')
const version = require('../package.json').version

const banner = `/*
 * Markx.js v${version}
 * (c) ${new Date().getFullYear()} Longzhang Tian
 * Released under the MIT License
 */`

function logError(e) {
  console.log(e)
}

rollup({
  entry: 'src/processText.js',
}).then(bundle => bundle.write({
  banner,
  format: 'cjs',
  dest: 'build/bundle.js',
  sourceMap: true,
})).then(() => {
  fs.writeFileSync('build/test/bundle.test.js',
    babel.transform(fs.readFileSync('src/test/processText.test.js', 'utf8').replace(/processText/g, 'bundle'), {
      "plugins": [
        ["transform-es2015-modules-commonjs", {
          "allowTopLevelThis": false,
          "strict": false,
          "loose": false,
        }]
      ]
    }).code
  )
}).catch(logError)
