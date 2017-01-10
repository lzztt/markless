/* eslint no-console: 'off', max-len: 'off' */
const https = require('https')
const http = require('http')
const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')
const conf = require('./saucelabs.conf')

if (!conf.build || !conf.tunnelIdentifier) {
  throw new Error(`invalid sauce lib config: build=${conf.build} tunnel=${conf.tunnelIdentifier}`)
}

const sauceAuth = `${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}`
const port = 9000
const page = '/build/test/test.html'

const post = (endpoint, data) => new Promise((resolve, reject) => {
  const body = JSON.stringify(data)
  const req = https.request({
    method: 'POST',
    path: `/rest/v1/${process.env.SAUCE_USERNAME}/${endpoint}`,
    hostname: 'saucelabs.com',
    auth: sauceAuth,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': body != null ? Buffer.byteLength(body) : 0,
    },
  }, (res) => {
    const chunks = []
    res.on('data', (chunk) => {
      chunks.push(chunk)
    })
    res.on('error', (err) => {
      throw err
    })
    res.on('end', () => {
      const ret = JSON.parse(chunks.join(''))
      if ('error' in ret) {
        reject(`got response with error: ${ret.error}`)
      }

      if (ret) {
        resolve(ret)
      } else {
        reject('no response returned')
      }
    })
  })

  req.on('error', (err) => {
    throw err
  })

  // post the data
  if (body != null) {
    req.write(body)
  }

  req.end()
})

const submitJobs = (config) => {
  const tests = config
  tests.url = `http://localhost:${port}${page}`
  tests.platforms = tests.platforms.filter(p => !('appiumVersion' in p)).map(p => [p.platform, p.browserName, p.version])

  return post('js-tests', tests)
}

const checkJobStatus = jobs => new Promise((resolve, reject) => {
  const timer = setInterval(() => {
    post('js-tests/status', jobs).then((status) => {
      // not completed yet
      if (!status.completed) {
        const pendingJobs = status['js tests'].filter(job => !job.result)
        console.log(`waiting for pending jobs: ${pendingJobs.length}`)
        return
      }

      const failedJobs = status['js tests'].filter(job => !job.result || job.result.tests !== job.result.passes)
      console.log(`successed jobs: ${status['js tests'].length - failedJobs.length}`)
      console.log(`failed    jobs: ${failedJobs.length}`)

      // completed
      clearInterval(timer)

      if (failedJobs.length > 0) {
        reject(`${failedJobs.length} jobs failed`)
      } else {
        resolve()
      }
    }).catch((err) => {
      reject(err)
    })
  }, 10 * 1000)

  // timeout after 1 hour
  setTimeout(() => {
    clearInterval(timer)
    reject('browser test jobs timeout')
  }, 3600 * 1000)
})


// Serve up module's root folder
const serve = serveStatic('.')

// Create server
let i = 0
const server = http.createServer((req, res) => {
  if (req.url === page) {
    i += 1
    console.log(`get test client ${i}: ${req.headers['user-agent']}`)
  }
  serve(req, res, finalhandler(req, res, {
    onerror: console.error,
  }))
})

server.on('err', (err) => {
  console.log(`http server error: ${err}`)
})

// start the server
server.listen(port, () => {
  console.log(`web server started at localhost:${port}`)

  submitJobs(conf)
    .then((jobs) => {
      console.log(`number of submited jobs: ${jobs['js tests'].length}`)
      return checkJobStatus(jobs)
    })
    .then(() => {
      server.close()
      process.exit(0)
    }).catch((err) => {
      console.log(err)
      server.close()
      process.exit(1)
    })
})
