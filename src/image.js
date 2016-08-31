/* eslint max-len: ["error", 200] */

const isImageUrl = str => str.match(/^(https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/) || str.match(/^((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/)


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
  } else if (line[0] === '[' && line[line.length - 1] === ']') {
    // image link
    if (line.match(/^\[(https?:\/\/)(([\w\-]{2,20}\.){1,4}\w{2,6}([^\s<'"\(\)\[\]\|]+)?) /)) {
      const space = line.indexOf(' ')
      const link = line.slice(1, space)
      const img = line.slice(space + 1, -1)
      if (isImageUrl(img)) {
        return `<a href="${link}"><img src="${img}"></a>`
      }
    } else if (line.includes(' http')) {
      return line.replace(
        /^\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/,
        '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    } else if (line.includes(' /')) {
      return line.replace(
        /^\[([^\s\[\]][^\[\]]*[^\s\[\]]) ((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/,
        '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    }
  }

  return line
}

export default image
