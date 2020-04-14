/* eslint no-continue: "off" */
/* eslint max-classes-per-file: ["error", 3] */

import popHeader from './popHeader'
import popQuote from './popQuote'
import popList from './popList'
import processLine from './processLine'

class ParagraphBlock {
  constructor(lines) {
    this.lines = lines
  }

  getInnerText() {
    return this.lines.join(' ')
  }

  toString() {
    return `<p>${this.getInnerText()}</p>`
  }
}

class QuoteBlock {
  constructor(blocks) {
    this.blocks = blocks
  }

  toString() {
    if (this.blocks.length === 1 && this.blocks[0] instanceof ParagraphBlock) {
      return `<blockquote>${this.blocks[0].getInnerText()}</blockquote>`
    }

    return `<blockquote>${this.blocks.join('')}</blockquote>`
  }
}

class ListBlock {
  constructor(type, items) {
    this.items = items
    this.type = type
  }

  toString() {
    const items = this.items.map((it) => {
      if (it.length === 1 && it[0] instanceof ParagraphBlock) {
        return it[0].getInnerText()
      }

      if (it.length === 2 && it[0] instanceof ParagraphBlock && it[1] instanceof ListBlock) {
        return it[0].getInnerText() + it[1]
      }

      return it.join('')
    })
    return `<${this.type}><li>${items.join('</li><li>')}</li></${this.type}>`
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
  const blocks = []

  let paragraphLines = []
  const processParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push(new ParagraphBlock(paragraphLines.map((ln) => ln.body)))
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
    let retLines = popHeader(lines)
    if (retLines.length > 0) {
      processParagraph()
      blocks.push(...retLines)
      continue
    }

    // quote
    retLines = popQuote(lines)
    if (retLines.length > 0) {
      processParagraph()
      blocks.push(new QuoteBlock(processLines(retLines)))
      continue
    }

    // list
    const list = popList(lines)
    if (list) {
      processParagraph()
      blocks.push(new ListBlock(list.type, list.items.map((it) => processLines(it))))
      continue
    }

    // just a normal paragraph line
    // can be image, media, or styled text
    const line = processLine(lines.shift())

    // block line
    if (line.type === 'blockImage' || line.type === 'media') {
      processParagraph()
      blocks.push(line.body)
      continue
    }

    // process existing paragraph lines
    if (paragraphLines.length > 0 && line.type !== paragraphLines[0].type) {
      processParagraph()
    }
    // add paragraph line
    paragraphLines.push(line)
  }

  processParagraph()

  return blocks
}

const processText = (text) => {
  const lines = text.trim().replace('\r', '').split(/\n/g)
  return processLines(lines).join('')
}

export default processText
