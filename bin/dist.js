/* eslint no-console: 'off' */

const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const version = require('../package.json').version

const banner = `/*
 * Markx.js v${version}
 * (c) ${new Date().getFullYear()} Longzhang Tian
 * Released under the MIT License
 */`

rollup({
  entry: 'src/processText.js',
  plugins: [
    babel({
      presets: [
        ['es2015', {
          modules: false,
        }],
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
}).then(bundle => bundle.write({
  banner,
  format: 'iife',
  moduleName: 'markx',
  dest: 'dist/markx.js',
})).catch(console.log)
