const debug = require('debug')('markx')
const processSection = require('./processSection.js')

const processText = function(text) {
  debug('processText', text)
  let sections = text.replace(/\r\n/gm, '\n').trim().split(/\n{2,}/gm)
  return sections.map(processSection).join('')
}

module.exports = processText
