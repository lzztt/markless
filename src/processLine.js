 const processLine = function(line) {
    console.log('processLine: ' + line)

    let ret = image(line)
    if (ret !== line)
      return ret

    ret = media(line)
    if (ret !== line)
      return ret

    // let hasEscape = (line.match(/`/g) || []).length > 1
    // let _escape = function(line) {
    //   //`1` `2` `3` => <1> <2> <3>
    // }

    // let _unescape = function(line) {
    //   //<1> <2> <3> => `1` `2` `3`
    // }

    return link(email(font(line)))
  }

  module.exports = processLine
