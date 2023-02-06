/* eslint no-console: 'off' */

const fs = require('fs')
const { rollup } = require('rollup')
const babel = require('@babel/core')
const readdirp = require('readdirp')
const { version } = require('../package.json')

const banner = `/*!
 * MarkLess.js v${version}
 * (c) ${new Date().getFullYear()} Longzhang Tian
 * Released under the MIT License
 */`

// bundle markless
rollup({
  input: 'src/processText.js',
}).then((bundle) => bundle.write({
  banner,
  format: 'umd',
  file: 'build/markless.js',
  name: 'markless',
})).catch(console.log)

// markless test
fs.readFile('src/test/processText.test.js', 'utf8', (rerr, data) => {
  if (rerr) {
    throw rerr
  }

  fs.writeFile(
    'build/test/markless.test.js',
    babel.transform(data.replace(/processText/g, 'markless')
      .replace(/describe\('(.*)',/g, (match, group1) => `describe('markless ${group1}',`), {
      presets: [
        ['@babel/env', {
          modules: 'umd',
        }],
      ],
      moduleId: 'marklessTest',
    }).code,
    (werr) => {
      if (werr) {
        throw werr
      }
    },
  )
})

// transform individual files and tests
const stream = readdirp('src', {
  entryType: 'files',
  fileFilter: '*.js',
})

const files = []

stream.on('warn', (err) => {
  console.error('warn', err)
}).on('error', (err) => {
  console.error('error', err)
}).on('data', (entry) => {
  const outFile = `build/${entry.path}`
  fs.readFile(`src/${entry.path}`, 'utf8', (rerr, data) => {
    if (rerr) {
      throw rerr
    }

    fs.writeFile(
      outFile,
      babel.transform(data, {
        presets: [
          ['@babel/env', {
            modules: 'umd',
          }],
        ],
        moduleId: entry.path.split('/').pop().slice(0, -3)
          .replace(/\.(.)/g, (match, group1) => group1.toUpperCase()),
      }).code.replace('{', '{\n  /* istanbul ignore next */'),
      (werr) => {
        if (werr) {
          throw werr
        }
      },
    )
  })

  files.push(outFile)
}).on('end', () => {
  files.push('build/markless.js', 'build/test/markless.test.js')
  const scripts = files.map((f) => (
    `<script src="${f.replace(/^build/, '..').replace('../test/', '')}"></script>`
  )).join('\n')

  fs.writeFile('build/test/test.html', `<html>
<head>
  <meta charset="utf-8">
  <title>MarkLess Tests</title>
  <link href="../../node_modules/mocha/mocha.css" rel="stylesheet" />
</head>
<body>
  <div id="mocha"></div>
  <script src="../../node_modules/chai/chai.js"></script>
  <script src="../../node_modules/mocha/mocha.js"></script>
  <script>mocha.setup('bdd')</script>
${scripts}
  <script>
    onload = function() {
      mocha.checkLeaks();
      mocha.globals(['mochaResults']);
      var runner = mocha.run();

      // Reporting JavaScript Unit Test Results to Sauce Labs with Mocha
      var failedTests = [];
      runner.on('end', function() {
        window.mochaResults = runner.stats;
        window.mochaResults.reports = failedTests;
      });

      runner.on('fail', logFailure);

      var flattenTitles = function(test) {
        var titles = [];
        while (test.parent.title) {
          titles.push(test.parent.title);
          test = test.parent;
        }
        return titles.reverse();
      };

      function logFailure(test, err) {
        failedTests.push({
          name: test.title,
          result: false,
          message: err.message,
          stack: err.stack,
          titles: flattenTitles(test)
        });
      };
    };
  </script>
</body>
</html>`, (werr) => {
    if (werr) {
      throw werr
    }
  })
})
