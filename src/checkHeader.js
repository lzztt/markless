const checkHeader = (lines) => {
  let i = 0,
    header = [],
    n = lines.length,
    line

  while (i < n) {
    line = lines[i]
    console.log('check header: ' + line, i)
    if (line[0] === '#') {
      if (line.substr(0, 2) === '# ') {
        // h1
        header.push('<h1>' + line.substr(2) + '</h1>')
      } else if (line.substr(0, 3) === '## ') {
        // h2
        header.push('<h2>' + line.substr(3) + '</h2>')
      } else if (line.substr(0, 4) === '### ') {
        // h3
        header.push('<h3>' + line.substr(4) + '</h3>')
      } else {
        break
      }
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

  return header
}

module.exports = checkHeader
