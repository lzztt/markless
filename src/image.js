/* eslint max-len: ["error", 150] */
const reImageHttp = /^(https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/
const reImageLocal = /^((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/

const reLinkedImage = /^\[(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?) /

const reTitledImageHttp = /^\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/
const reTitledImageLocal = /^\[([^\s\[\]][^\[\]]*[^\s\[\]]) ((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/

const isImageUrl = (str) => str.match(reImageHttp) || str.match(reImageLocal)

const image = (line) => {
  // must be a new line, and 1 line only
  // https://static.image.com/image.jpg
  // /data/image.jpg
  // [text /data/image.jpg]
  // [text https://static.image.com/image.jpg]
  // linked image:
  // [link_url image_url]
  if (isImageUrl(line)) {
    return `<img src="${line}">`
  } if (line[0] === '[' && line[line.length - 1] === ']') {
    // image link
    if (line.match(reLinkedImage)) {
      const space = line.indexOf(' ')
      const link = line.slice(1, space)
      const img = line.slice(space + 1, -1)
      if (isImageUrl(img)) {
        return `<a href="${link}"><img src="${img}"></a>`
      }
    } else if (line.includes(' http')) {
      return line.replace(reTitledImageHttp, '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    } else if (line.includes(' /')) {
      return line.replace(reTitledImageLocal, '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    }
  }

  return line
}

export default image
