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

const checkList = (lines) => {
  if (lines.length > 0) {
    let type, i = 0

    let line = lines[i],
      prefix = line.match(/^[0-9]{1,2}\. +/)
    if (prefix) {
      type = OLIST
    } else {
      prefix = line.match(/^- +/)
      if (prefix) {
        type = ULIST
      }
    }

    let items = []
    if (prefix) {
      // found an item
      items.push(new Item(prefix[0].length, line))

      // check more lines
      for (i = 1; i < lines.length; i++) {
        let line = lines[i],
          prefix = type === OLIST ? line.match(/^[0-9]{1,2}\. +/) : line.match(/^- +/)
        if (prefix) {
          // new list item
          items.push(new Item(prefix[0].length, line))
        } else {
          // not a new list item
          // check if line belongs to last item (have the same indent)
          let item = items[items.length - 1]
          if (line.replace(/^ */, '').length === line.length - item.indent) {
            item.add(line)
          } else {
            break
          }
        }
      }
    }

    // remove processed lines
    // list need to contain at least two items
    if (items.length > 1) {
      lines.splice(0, i)
      return {
        type: type,
        items: items.map(it => it.lines)
      }
    }
  }

  return {
    type: null,
    items: []
  }
}

module.exports = checkList
