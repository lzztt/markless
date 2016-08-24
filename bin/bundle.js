/* eslint no-console: "off" */

const fs = require('fs')
const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`
}

function logError(e) {
  console.log(e)
}

function blue(str) {
  return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`
}

function write(dest, code) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, (err) => {
      if (err) {
        reject(err)
        return
      }
      console.log(`${blue(dest)} ${getSize(code)}`)
      resolve()
    })
  })
}

rollup({
  entry: 'src/markx.js',
  plugins: [commonjs()],
}).then(bundle => write('dist/markx.js', bundle.generate({
  format: 'cjs',
  banner: '// banner',
}).code)).catch(logError)
