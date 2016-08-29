module.exports = {
  name: `markless #${process.env.TRAVIS_BUILD_NUMBER} @ node ${process.version}`,
  build: process.env.TRAVIS_BUILD_NUMBER,
  tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
  recordVideo: false,
  framework: 'mocha',
  platforms: [{
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11.0',
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '52.0',
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '51.0',
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '50.0',
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '46.0',
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '47.0',
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '48.0',
  }, {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '13.10586',
  }, {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '46.0',
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.103',
  }, {
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11.0',
  }, {
    browserName: 'safari',
    platform: 'OS X 10.9',
    version: '7.0',
  }, {
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8.0',
  }, {
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9.0',
  }, {
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '9.3',
  }, {
    browserName: 'android',
    platform: 'Linux',
    version: '4.4',
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    deviceName: 'iPhone 6s Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.3',
    platformName: 'iOS',
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    deviceName: 'iPhone 6 Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.2',
    platformName: 'iOS',
  }, {
    browserName: 'Safari',
    appiumVersion: '1.5.3',
    deviceName: 'iPhone 5s Simulator',
    deviceOrientation: 'portrait',
    platformVersion: '9.1',
    platformName: 'iOS',
  }],
}
