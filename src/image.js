const debug = require('debug')('markx')

const image = function(line) {
  debug('image: ' + line)
  let imageDomain = '' //'//static.piebbs.com'
    // must be a new line, and 1 line only
    // https://static.image.com/image.jpg[picture]
    // /data/image.jpg[picture]
  if (line.substr(0, 4) === 'http') {
    debug('found image: ' + line)
    if (line[line.length - 1] !== ']') {
      return line.replace(/^(https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/, '<img src="$1">')
    } else {
      // return line.replace(/^(https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\[([^\s\[\]][^\[\]]*[^\s\[\]])\]$/, '<figure><figcaption>$5</figcaption><img src="$1"></figure>')
      return line.replace(/^\[([^\s\[\]][^\[\]]*[^\s\[\]]) (https?:\/\/([\w\-]{2,20}\.){1,4}\w{2,6}(\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/, '<figure><figcaption>$1</figcaption><img src="$2"></figure>')
    }
  } else if (line[0] === '/') {
    debug('found image: ' + line)
    if (line[line.length - 1] !== ']') {
      return line.replace(/^((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))$/, '<img src="' + imageDomain + '$1">')
    } else {
      // return line.replace(/^((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\[([^\s\[\]][^\[\]]*[^\s\[\]])\]$/, '<figure><figcaption>$4</figcaption><img src="' + imageDomain + '$1"></figure>')
      return line.replace(/^\[([^\s\[\]][^\[\]]*[^\s\[\]]) ((\/[^\/\s<'"\(\)\[\]\|]+)+\.(jpe?g|png|gif))\]$/, '<figure><figcaption>$1</figcaption><img src="' + imageDomain + '$2"></figure>')
    }
  } else {
    return line
  }
}

module.exports = image
