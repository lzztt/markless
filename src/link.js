const link = (line) => {
  // raw url:
  // https://www.houstonbbs.com
  // text url:
  // [text https://www.houstonbbs.com]
  if (line.includes('http://') || line.includes('https://')) {
    let http = '<H^T^T^P>',
      escaped = false

    line = line.replace(/\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)\]/g, (match, p1, p2, p3) => {
      escaped = true
      p1 = p1.replace('http', http)
      p2 = p2.replace('http', http)
      return `<a href="${p2}${p3}">${p1}</a>`
    }).replace(/(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)/g, '<a href="$1$2">$2</a>')

    return escaped ? line.replace(http, 'http') : line
  }

  return line
}

module.exports = link
