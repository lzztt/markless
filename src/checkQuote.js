const checkQuote = function(lines) {
  let i = 0,
    quote = [],
    n = lines.length,
    line

  while (i < n) {
    line = lines[i]
    console.log('checkQuote: ' + line)
    if (line.substr(0, 2) === '> ') {
      // only take well formated, first level quote
      // nested quote (>>) will be ignored
      quote.push(line.replace(/^> /, ''))
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

  return quote
}

module.exports = checkQuote
