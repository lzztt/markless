const image = require('./image.js')
const media = require('./media.js')
const link = require('./link.js')
const email = require('./email.js')
const font = require('./font.js')

const processLine = (line) => {
  line = line.trim()

  let ret = image(line)
  if (ret !== line)
    return ret

  ret = media(line)
  if (ret !== line)
    return ret

  let segments = line.split('`')
  let last = ''
  if (segments.length % 2 === 0) {
    // odd number of '`'
    last = '`' + segments.pop()
  }

  return segments.map((segment, index) => {
    return index % 2 === 0 ? link(email(font(segment))) : `<em class="code">${segment}</em>`
  }).join('') + last
}

module.exports = processLine
