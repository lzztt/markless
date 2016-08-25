/* eslint no-console: 'off' */

const fs = require('fs')
const rollup = require('rollup').rollup
const babel = require('babel-core')

rollup({
  entry: 'src/processText.js',
}).then(bundle => bundle.write({
  format: 'cjs',
  dest: 'build/bundle.js',
})).catch(console.log)

fs.writeFile('build/test/bundle.test.js',
  babel.transform(fs.readFileSync('src/test/processText.test.js', 'utf8')
    .replace(/processText/g, 'bundle'), {
      plugins: [
        [
          'transform-es2015-modules-commonjs', {
            allowTopLevelThis: false,
            strict: false,
            loose: false,
          },
        ],
      ],
    }).code
)
