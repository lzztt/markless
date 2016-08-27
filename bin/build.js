/* eslint no-console: 'off' */

const fs = require('fs')
const rollup = require('rollup').rollup
const babel = require('babel-core')
const readdirp = require('readdirp')

const stream = readdirp({
  root: 'src',
  entryType: 'files',
  fileFilter: '*.js',
})

rollup({
  entry: 'src/processText.js',
}).then(bundle => bundle.write({
  format: 'umd',
  dest: 'build/bundle.js',
  moduleId: 'bundle',
  moduleName: 'bundle',
})).catch(console.log)

fs.readFile('src/test/processText.test.js', 'utf8', (rerr, data) => {
  if (rerr) {
    throw rerr
  }

  fs.writeFile('build/test/bundle.test.js',
    babel.transform(data.replace(/processText/g, 'bundle')
      .replace(/describe\('(.*)',/g, (match, group1) => `describe('bundle ${group1}',`), {
        presets: [
          ['es2015', {
            modules: 'umd',
          }],
        ],
        moduleId: 'bundleTest',
      }).code,
    err => {
      if (err) {
        throw err
      }
    })
})

const files = []

stream.on('warn', err => {
  console.error('warn', err)
}).on('error', err => {
  console.error('error', err)
}).on('data', entry => {
  const outFile = `build/${entry.path}`
  fs.readFile(`src/${entry.path}`, 'utf8', (rerr, data) => {
    if (rerr) {
      throw rerr
    }

    fs.writeFile(outFile,
      babel.transform(data, {
        presets: [
          ['es2015', {
            modules: 'umd',
          }],
        ],
        moduleId: entry.path.split('/').pop().slice(0, -3)
          .replace(/\.(.)/g, (match, group1) => group1.toUpperCase()),
      }).code,
      werr => {
        if (werr) {
          throw werr
        }
      })
  })

  files.push(outFile)
}).on('end', () => {
  files.push('build/bundle.js', 'build/test/bundle.test.js')
  const scripts = files.map(f => `<script src="${f.slice(6)}"></script>`).join('\n')

  fs.writeFile('build/test.html', `<html>
<head>
  <meta charset="utf-8">
  <title>Markx Tests</title>
  <link href="../node_modules/mocha/mocha.css" rel="stylesheet" />
</head>
<body>
  <div id="mocha"></div>

  <script src="../node_modules/chai/chai.js"></script>
  <script src="../node_modules/mocha/mocha.js"></script>

  <script>mocha.setup('bdd')</script>
${scripts}
  <script>
    mocha.checkLeaks();
    mocha.run();
  </script>
</body>
</html>`)
})
