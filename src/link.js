const link = function(line) {
  console.log('link: ' + line)
    // must be a new line, and 1 line only
    // https://www.houstonbbs.com[text]
    // raw url:
    // https://www.houstonbbs.com
    // text url:
    // [text https://www.houstonbbs.com]
  if (line.indexOf('http://') === -1 && line.indexOf('https://') === -1) {
    return line
  } else {
    console.log('found link: ' + line)
      // let li = line.replace(/(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)\[([^\s\[\]][^\[\]]*[^\s\[\]])\]/, '<a href="$1$2">$5</a>')
    let li = line.replace(/\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)\]/, '<a href="$2$3">$1</a>')
    if (li.length !== line.length) {
      return li
    } else {
      return line.replace(/(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)/, '<a href="$1$2">$2</a>')
    }
  }
}

module.exports = link
