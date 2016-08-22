const popHeader = (lines) => {
  let i = 0,
    header = [],
    n = lines.length,
    line

  while (i < n) {
    line = lines[i]

    if (line[0] === '#') {
      if (line.slice(0, 2) === '# ') {
        // h1
        header.push('<h1>' + line.slice(2).trim() + '</h1>')
      } else if (line.slice(0, 3) === '## ') {
        // h2
        header.push('<h2>' + line.slice(3).trim() + '</h2>')
      } else if (line.slice(0, 4) === '### ') {
        // h3
        header.push('<h3>' + line.slice(4).trim() + '</h3>')
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

module.exports = popHeader
