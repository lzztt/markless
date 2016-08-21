const image = (line) => {
  // must be a new line, and 1 line only
  // https://static.image.com/image.jpg
  // /data/image.jpg
  // [text /data/image.jpg]
  // [text https://static.image.com/image.jpg]
  if (line.slice(0, 4) === 'http') {
    return line.replace(/^(https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/, '<img src="$1">')
  } else if (line[0] === '/') {
    return line.replace(/^((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/, '<img src="' + '$1">')
  } else if (line[0] === '[' && line[line.length - 1] === ']') {
    if (line.includes(' http')) {
      return line.replace(/^\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/, '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    } else if (line.includes(' /')) {
      return line.replace(/^\[([^\s\[\]][^\[\]]*[^\s\[\]]) ((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/, '<figure><figcaption>$1</figcaption><img src="' + '$2"></figure>')
    }
  }

  return line
}

module.exports = image
