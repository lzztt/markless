const debug = require('debug')('markx')
const checkNestedList = require('./checkNestedList.js')
const processLine = require('./processLine.js')

const checkOrderedList = function(lines) {
  let i = 0,
    list = [],
    n = lines.length
  if (n === 0)
    return list

  let line = lines[i]
  debug('checkOrderedList: ' + line)
    // ordered list
  if (line.match(/^[0-9]\. /)) {
    debug('found ordered list line: ' + line)
      // first level always labeled with numbers, up to 2 levels
    list.push(line.replace(/^[0-9]\. +/, ''))

    // go to next line
    i++
    while (i < n) {
      line = lines[i]
      debug('checkOrderedList: ' + line)
      if (line.match(/^[0-9]\. /)) {
        debug('found ordered list line: ' + line)
        list.push(line.replace(/^[0-9]\. +/, ''))
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
      debug(li)
      return processLine(li.text) + li.sublists.map(function(sl) {
        return '<' + sl.type + '><li>' + sl.list.map(processLine).join('</li><li>') + '</li></' + sl.type + '>'
      }).join('')
    } else if (typeof li === 'string') {
      return processLine(li)
    }
  })
}

module.exports = checkOrderedList
