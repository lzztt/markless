/* eslint no-console: 'off' */

const fs = require('fs')
const zlib = require('zlib')
const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const uglify = require('uglify-js')
const version = require('../package.json').version

const banner = `/*
 * Markx.js v${version}
 * (c) ${new Date().getFullYear()} Longzhang Tian
 * Released under the MIT License
 */`

const getSize = code => `${(code.length / 1024).toFixed(2)}kb`

const blue = str => `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`

const write = (file, code) => new Promise((resolve, reject) => {
  fs.writeFile(file, code, (err) => {
    if (err) {
      reject(err)
      return
    }
    console.log(`${blue(file)} ${getSize(code)}`)
    resolve(file)
  })
})

const zip = files => Promise.all(files.map(f => new Promise((resolve, reject) => {
  fs.readFile(f, (rerr, rbuf) => {
    if (rerr) {
      reject(rerr)
      return
    }
    zlib.gzip(rbuf, (zerr, zbuf) => {
      if (zerr) {
        reject(zerr)
        return
      }
      write(`${f}.gz`, zbuf).then(resolve)
    })
  })
})))

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
}).then(bundle => {
  const code = bundle.generate({
    banner,
    format: 'umd',
    moduleName: 'markx',
    moduleId: 'markx',
  }).code

  const res = uglify.minify(code, {
    fromString: true,
    outSourceMap: 'markx.min.js.map',
    output: {
      preamble: banner,
      ascii_only: true,
    },
  })

  write('dist/markx.min.js.map', res.map.replace('"sources":["?"]', '"sources":["markx.js"]'))

  return Promise.all([
    write('dist/markx.js', code),
    write('dist/markx.min.js', res.code),
  ])
}).then(zip).catch(console.log)
