const popHeader = require('./popHeader.js')
const popQuote = require('./popQuote.js')
const popList = require('./popList.js')
const processLine = require('./processLine.js')

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
      return '<blockquote>' + this.blocks[0].getInnerText() + '</blockquote>'
    }

    return '<blockquote>' + this.blocks.join('') + '</blockquote>'
  }
}

class ListBlock {
  constructor(type, items) {
    this.items = items
    this.type = type
  }

  toString() {
    let items = this.items.map(it => {
      if (it.length === 1 && it[0] instanceof ParagraphBlock) {
        return it[0].getInnerText()
      }

      if (it.length === 2 && it[0] instanceof ParagraphBlock && it[1] instanceof ListBlock) {
        return it[0].getInnerText() + it[1]
      }

      return it.join('')
    })
    return '<' + this.type + '><li>' + items.join('</li><li>') + '</li></' + this.type + '>'
  }
}

class ParagraphBlock {
  constructor(lines) {
    this.lines = lines
  }

  getInnerText() {
    return this.lines.map(processLine).join('<br>')
  }

  toString() {
    return '<p>' + this.getInnerText() + '</p>'
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
      continue
    }

    // quote
    _lines = popQuote(lines)
    if (_lines.length > 0) {
      processParagraph()
      blocks.push(new QuoteBlock(processLines(_lines)))
      continue
    }

    // list
    let list = popList(lines)
    if (list) {
      processParagraph()
      blocks.push(new ListBlock(list.type, list.items.map(it => processLines(it))))
      continue
    }

    // just a normal paragraph line
    paragraphLines.push(lines.shift())
  }

  processParagraph()

  return blocks
}

module.exports = processText
