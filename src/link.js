/* eslint max-len: ["error", 150] */

const reLink = /(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)/g
const reTitledLink = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?)\]/g

const link = (line) => {
  // raw url:
  // https://www.houstonbbs.com
  // text url:
  // [text https://www.houstonbbs.com]
  if (line.includes('http://') || line.includes('https://')) {
    const http = '<H^T^T^P>'
    let escaped = false

    const ret = line.replace(reTitledLink, (match, p1, p2, p3) => {
      escaped = true
      return `<a href="${p2.replace('http', http)}${p3}">${p1.replace('http', http)}</a>`
    }).replace(reLink, '<a href="$1$2">$2</a>')

    return escaped ? ret.replace(http, 'http') : ret
  }

  return line
}

export default link
