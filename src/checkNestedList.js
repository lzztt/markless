const checkNestedList = function(line, list) {
  console.log('checkNestedList: ' + line)
  if (line.match(/^ +- /)) {
    // nested unordered list
    console.log('found nested ulist line: ' + line, list)
    let last = list[list.length - 1]
    if (typeof last === 'string') {
      list.push({
        text: list.pop(),
        sublists: [{
          type: 'ul',
          list: []
        }]
      })
      last = list[list.length - 1]
    } else if (typeof last === 'object' && last.sublists[last.sublists.length - 1].type !== 'ul') {
      last.sublists.push({
        type: 'ul',
        list: []
      })
    }
    last.sublists[last.sublists.length - 1].list.push(line.replace(/^ +- +/, ''))
  } else if (line.match(/^ +[0-9]\. /)) {
    // nested ordered list, labeled with numbers
    console.log('found nested olist line: ' + line)
    let last = list[list.length - 1]
    if (typeof last === 'string') {
      list.push({
        text: list.pop(),
        sublists: [{
          type: 'ol',
          list: []
        }]
      })
      last = list[list.length - 1]
    } else if (typeof last === 'object' && last.sublists[last.sublists.length - 1].type !== 'ol') {
      last.sublists.push({
        type: 'ol',
        list: []
      })
    }
    last.sublists[last.sublists.length - 1].list.push(line.replace(/^ +[0-9]\. +/, ''))
  } else {
    return false
  }
  console.log(list)
  return true
}

module.exports = checkNestedList
