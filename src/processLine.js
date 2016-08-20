const debug = require('debug')('markx')
const image = require('./image.js')
const media = require('./media.js')
const link = require('./link.js')
const email = require('./email.js')
const font = require('./font.js')

const processLine = function(line) {
  debug('processLine: ' + line)

  let ret = image(line)
  if (ret !== line)
    return ret

  ret = media(line)
  if (ret !== line)
    return ret

  // let hasEscape = (line.match(/`/g) || []).length > 1
  // let _escape = function(line) {
  //   //`1` `2` `3` => <1> <2> <3>
  // }

  // let _unescape = function(line) {
  //   //<1> <2> <3> => `1` `2` `3`
  // }

  return link(email(font(line)))
}

module.exports = processLine
