class Item {
  constructor(indentSize, line) {
    this.indent = indentSize
    this.lines = [line.slice(indentSize)]
  }

  add(line) {
    this.lines.push(line.slice(this.indent))
  }
}

const OLIST = 'ol'
const ULIST = 'ul'

const popList = (lines) => {
  if (lines.length > 0) {
    const items = []

    let type
    let i = 0
    let line = lines[i]
    let prefix = line.match(/^[0-9]{1,2}\. +/)
    if (prefix) {
      type = OLIST
    } else {
      prefix = line.match(/^- +/)
      if (prefix) {
        type = ULIST
      }
    }

    if (type) {
      // found an item
      items.push(new Item(prefix[0].length, line))

      // check more lines
      for (i = 1; i < lines.length; i++) {
        line = lines[i]
        prefix = type === OLIST ? line.match(/^[0-9]{1,2}\. +/) : line.match(/^- +/)
        if (prefix) {
          // new list item
          items.push(new Item(prefix[0].length, line))
        } else {
          // not a new list item
          // check if line belongs to last item (have the same indent)
          const item = items[items.length - 1]
          if (line.length > item.indent && line.slice(0, item.indent).match(/^ *$/)) {
            item.add(line)
          } else {
            break
          }
        }
      }
    }

    // remove processed lines
    if (items.length > 0) {
      lines.splice(0, i)
      return {
        type,
        items: items.map(it => it.lines),
      }
    }
  }

  return null
}

export default popList
