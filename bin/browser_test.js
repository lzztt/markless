/* eslint no-console: 'off', max-len: 'off' */
const https = require('https')
const http = require('http')
const serveStatic = require('serve-static')
const conf = require('./saucelabs.conf')

const submitJobs = (config) => {
  const data = config
  data.platforms = data.platforms.filter(p => !('appiumVersion' in p)).map(p => [p.platform, p.browserName, p.version])
  const body = JSON.stringify(data)

  const options = {
    method: 'POST',
    path: '/rest/v1/longztian/js-tests',
    hostname: 'saucelabs.com',
    auth: `${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': body != null ? Buffer.byteLength(body) : 0,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('error', (err) => {
        throw err
      })
      res.on('end', () => {
        const jobs = JSON.parse(chunks.join(''))
        if ('error' in jobs) {
          reject(`Error: ${jobs.error}`)
        }

        console.log(`saucelabs jobs: ${chunks.join('')}`)
        if (jobs) {
          resolve(jobs)
        } else {
          reject('no job ids returned')
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
}

const checkJobStatus = (jobs) => {
  const body = JSON.stringify(jobs)
  const options = {
    method: 'POST',
    path: '/rest/v1/longztian/js-tests/status',
    hostname: 'saucelabs.com',
    auth: `${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': body != null ? Buffer.byteLength(body) : 0,
    },
  }

  const queryStatus = () => new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('error', (err) => {
        console.log(err)
        throw err
      })
      res.on('end', () => {
        const status = JSON.parse(chunks.join(''))
        if (status) {
          resolve(status)
        } else {
          reject('no job status returned')
        }
      })
    })

    req.on('error', (err) => {
      console.log(err)
      throw err
    })

    // post the data
    if (body != null) {
      req.write(body)
    }

    req.end()
  })

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      queryStatus().then(status => {
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
      }).catch(err => {
        console.log(err)
        throw err
      })
    }, 10 * 1000)

    // timeout after 1 hour
    setTimeout(() => {
      clearInterval(timer)
      reject('browser test jobs timeout')
    }, 3600 * 1000)
  })
}


// Serve up module's root folder
const serve = serveStatic('.')
const next = err => {
  if (err) {
    console.log(err)
  }
}

// Create server
const server = http.createServer((req, res) => {
  if (req.url.endsWith('.html')) {
    console.log(`server get request: ${req.socket.remoteAddress}: ${req.url}`)
  }
  serve(req, res, next)
})

server.on('err', err => {
  console.log(`http server error: ${err}`)
})

// start the server
server.listen(9000, () => {
  console.log('web server started at localhost:9000')

  submitJobs(conf)
    .then(jobs => checkJobStatus(jobs))
    .then(() => {
      server.close()
      process.exit(0)
    }).catch(err => {
      console.log(err)
      server.close()
      process.exit(1)
    })
})
