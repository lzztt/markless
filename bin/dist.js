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

rollup({
  entry: 'src/processText.js',
}).then(bundle => {
  const code = bundle.generate().code

  fs.writeFile('dist/markx.es6.js', code)
  fs.writeFileSync('dist/markx.es5.js',
    babel.transform(code, {
      presets: [
        ['es2015', {
          modules: false,
        }],
      ],
    }).code
  )
  return rollup({
    entry: 'dist/markx.es5.js',
  })
}).then(bundle => bundle.write({
  banner,
  format: 'iife',
  moduleName: 'markx',
  dest: 'dist/markx.js',
})).catch(console.log)
