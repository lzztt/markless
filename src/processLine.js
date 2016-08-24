import image from './image'
import media from './media'
import link from './link'
import email from './email'
import font from './font'

const processLine = (line) => {
  const ln = line.trim()

  let ret = image(ln)
  if (ret !== ln) {
    return ret
  }

  ret = media(ln)
  if (ret !== ln) {
    return ret
  }

  const segments = ln.split('`')
  let last = ''
  if (segments.length % 2 === 0) {
    // odd number of '`'
    last = `\`${segments.pop()}`
  }

  return segments.map(
    (segment, index) =>
    (index % 2 === 0 ? link(email(font(segment))) : `<em class="code">${segment}</em>`)
  ).join('') + last
}

export default processLine
