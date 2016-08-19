const checkUnorderedList = function(lines) {
  let i = 0,
    list = [],
    n = lines.length
  if (n === 0)
    return list

  let line = lines[i]
  console.log('checkUnorderedList: ' + line)
    // unordered list
  if (line.substr(0, 2) === '- ') {
    console.log('found unordered list line: ' + line)
      // up to 2 levels
    list.push(line.replace(/^- +/, ''))
      // go to next line
    i++
    while (i < n) {
      line = lines[i]
      console.log('checkUnorderedList: ' + line)
      if (line.substr(0, 2) === '- ') {
        console.log('found unordered list line: ' + line)
        list.push(line.replace(/^- +/, ''))
      } else if (!checkNestedList(line, list)) {
        break
      }
      // go to next line
      i++
    }
  }

  // remove processed lines
  if (i > 0) {
    lines.splice(0, i)
  }

  return list.map(function(li) {
    if (typeof li === 'object' && 'sublists' in li) {
      console.log(li)
      return processLine(li.text) + li.sublists.map(function(sl) {
        return '<' + sl.type + '><li>' + sl.list.map(processLine).join('</li><li>') + '</li></' + sl.type + '>'
      }).join('')
    } else if (typeof li === 'string') {
      return processLine(li)
    }
  })
}

module.exports = checkUnorderedList
