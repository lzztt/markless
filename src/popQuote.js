const popQuote = (lines) => {
  let i, line, quote = []

  for (i = 0; i < lines.length; i++) {
    line = lines[i]

    if (line.slice(0, 2) === '> ') {
      quote.push(line.slice(2))
    } else {
      break
    }
  }

  // remove processed lines
  if (i > 0) {
    lines.splice(0, i)
  }

  return quote
}

module.exports = popQuote
