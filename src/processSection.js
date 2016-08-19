const processSection = function(sec) {
  /*
   * each section can be:
   * paragraph
   * header
   * quote
   * unordered list
   * ordered list
   */
  let lines = sec.split(/\n/gm),
    html = '',
    nLineLeft = 100 // process up to 100 lines in each section

  if (lines.length > nLineLeft) {
    lines.splice(nLineLeft)
  }

  console.log('====== new section =====', lines)

  while (lines.length > 0) {
    // update nLineLeft and avoid infinite loop caused by unprocessable lines
    nLineLeft = lines.length

    let processedLines = checkParagraph(lines)
    if (processedLines.length > 0) {
      console.log('found paragraph lines')
      html = html + '<p>' + processedLines.join('<br>') + '</p>'
        // finished?
      if (lines.length === 0)
        break
    }

    // header
    processedLines = checkHeader(lines)
    if (processedLines.length > 0) {
      console.log('found header lines')
      html = html + processedLines.join('')
        // finished?
      if (lines.length === 0)
        break
    }

    // quote
    processedLines = checkQuote(lines)
    if (processedLines.length > 0) {
      console.log('found quote lines', processedLines)
      html = html + '<blockquote>' + processText(processedLines.join('\n')) + '</blockquote>'
        // finished?
      if (lines.length === 0)
        break
    }

    // unordered list
    processedLines = checkUnorderedList(lines)
    if (processedLines.length > 0) {
      console.log('found ul lines')
      html = html + '<ul><li>' + processedLines.join('</li><li>') + '</li></ul>'
        // finished?
      if (lines.length === 0)
        break
    }

    // ordered list
    processedLines = checkOrderedList(lines)
    if (processedLines.length > 0) {
      console.log('found ol lines')
      html = html + '<ol><li>' + processedLines.join('</li><li>') + '</li></ol>'
        // finished?
      if (lines.length === 0)
        break
    }

    // nothing get processed?
    // we meet unprocessable lines
    if (lines.length === nLineLeft) {
      break
    }
  }

  return html
}

module.exports = processSection
