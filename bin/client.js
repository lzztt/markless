/* eslint no-console: 'off', max-len: 'off' */
const https = require('https')

const data = {
  framework: 'mocha',
  url: 'http://localhost:9000/build/test/test.html',
  platforms: [{
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11.0',
    recordVideo: false,
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '52.0',
    recordVideo: false,
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '51.0',
    recordVideo: false,
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '50.0',
    recordVideo: false,
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '46.0',
    recordVideo: false,
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '47.0',
    recordVideo: false,
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '48.0',
    recordVideo: false,
  }, {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '13.10586',
    recordVideo: false,
  }, {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '46.0',
    recordVideo: false,
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.103',
    recordVideo: false,
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11.0',
    recordVideo: false,
  }, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7.0',
    recordVideo: false,
  }, {
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8.0',
    recordVideo: false,
  }, {
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9.0',
    recordVideo: false,
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    recordVideo: false,
    deviceName: 'iPhone 6s Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.3',
    platformName: 'iOS',
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    recordVideo: false,
    deviceName: 'iPhone 6 Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.2',
    platformName: 'iOS',
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    recordVideo: false,
    deviceName: 'iPhone 5s Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.1',
    platformName: 'iOS',
  }],
}

data.platforms = data.platforms.filter(p => !('appiumVersion' in p)).map(p => [p.platform, p.browserName, p.version])
const body = JSON.stringify(data)

const options = {
  method: 'POST',
  path: '/rest/v1/longztian/js-tests',
  hostname: 'saucelabs.com',
  auth: 'longztian:ecd15b59-b05f-4a82-a54f-97e97b859965',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Length': body != null ? Buffer.byteLength(body) : 0,
  },
}

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode)
  console.log('headers:', res.headers)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

// post the data
if (body != null) {
  req.write(body)
}
req.end()

req.on('error', (e) => {
  console.error(e)
})
