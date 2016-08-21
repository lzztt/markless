const processLine = require('./processLine.js')

const checkParagraph = (lines) => {
  let i = 0,
    pLines = [],
    n = lines.length,
    line, begin

  while (i < n) {
    line = lines[i]
    begin = line.slice(0, 2)
    if (begin !== '> ' && begin !== '- ' && line.search(/^[0-9]{1,2}\. /) === -1 && line.search(/^#{1,3} /) === -1) {
      pLines.push(line)
    } else {
      break
    }
    // go to next line
    i++
  }

  // remove processed lines
  if (i > 0) {
    lines.splice(0, i)
  }

  return pLines.map(processLine)
}

module.exports = checkParagraph
