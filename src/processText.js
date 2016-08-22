const popHeader = require('./popHeader.js')
const popQuote = require('./popQuote.js')
const popList = require('./popList.js')

const processText = (text) => {
  let lines = text.trim().replace('\r', '').split(/\n/g)
  return processLines(lines).join('')
}

class HeaderBlock {
  constructor(line) {
    this.line = line
  }

  toString() {
    return this.line
  }
}

class QuoteBlock {
  constructor(blocks) {
    this.blocks = blocks
  }

  toString() {
    if (this.blocks.length === 1 && this.blocks[0] instanceof ParagraphBlock) {
      return '<blockquote>' + this.lines.join('<br>') + '</blockquote>'
    }

    return '<blockquote>' + this.blocks.join('') + '</blockquote>'
  }
}

class ListBlock {
  constructor(items, type) {
    this.items = items
    this.type = type
  }

  toString() {
    return '<' + this.type + '><li>' + this.items.join('</li><li>') + '</li></' + this.type + '>'
  }
}

class ParagraphBlock {
  constructor(lines) {
    this.lines = lines
  }

  toString() {
    return '<p>' + this.lines.join('<br>') + '</p>'
  }
}



const processLines = (lines) => {
  /*
   * a section contains one block or multiple blocks:
   * a block can be:
   *   header: <h1>...<h3>
   *   quote: <blockquote>
   *   list: <ol>/<ul>
   *   paragraph: <p>
   */
  let blocks = []

  let paragraphLines = []
  let processParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push(new ParagraphBlock(paragraphLines))
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
      blocks.push(..._lines.map(line => new HeaderBlock(line)))
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // quote
    _lines = popQuote(lines)
    if (_lines.length > 0) {
      processParagraph()
      blocks.push(new QuoteBlock(processLines(_lines)))
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // list
    let list = popList(lines)
    if (list) {
      processParagraph()
      blocks.push(new ListBlock(list.type, list.items.map(it => processLines(it))))
        // finished?
      if (lines.length === 0) {
        break
      }
    }

    // just a normal paragraph line
    paragraphLines.push(lines.shift())
  }

  processParagraph()

  return blocks
}

module.exports = processText
