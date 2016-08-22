const popHeader = require('./popHeader.js')
const popQuote = require('./popQuote.js')
const processText = require('./processText.js')
const popList = require('./popList.js')

const processSection = function(sec) {
  /*
   * a section contains one block or multiple blocks:
   * a block can be:
   *   header: <h1>...<h3>
   *   quote: <blockquote>
   *   list: <ol>/<ul>
   *   paragraph: <p>
   */
  let lines = sec.split(/\n/gm),
    html = ''

  let paragraphLines = []
  let processParagraph = () => {
    if (paragraphLines.length > 0) {
      html += '<p>' + paragraphLines.join('<br>') + '</p>'
      paragraphLines = []
    }
  }

  while (lines.length > 0) {
    // empty line
    if (lines[0].match(/^\s*$/)) {
      processParagraph()
      lines.shift()
      continue
    }

    // header
    let _lines = popHeader(lines)
    if (_lines.length > 0) {
      processParagraph()
      html = html + _lines.join('')
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // quote
    _lines = popQuote(lines)
    if (_lines.length > 0) {
      processParagraph()
      html = html + '<blockquote>' + processText(_lines.join('\n')) + '</blockquote>'
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // list
    _lines = popList(lines)
    if (_lines.length > 0) {
      processParagraph()
      html = html + '<ul><li>' + _lines.join('</li><li>') + '</li></ul>'
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // just a normal paragraph line
    paragraphLines.push(lines.shift())
  }

  processParagraph()

  return html
}

module.exports = processSection
