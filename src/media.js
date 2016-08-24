const media = (line) => {
  if (line.search(/[\s<'"\(\)\[\]\{\}\|]/) !== -1) {
    return line
  }

  if (line.slice(0, 8) === 'https://') {
    // https
    // youtube video
    // https://www.youtube.com/watch?v=lkrlNGLtidg
    // https://youtu.be/lkrlNGLtidg
    // <iframe width='420' height='315' src='https://www.youtube.com/embed/lkrlNGLtidg' frameborder='0' allowfullscreen></iframe>
    // youtube video list
    // https://www.youtube.com/watch?v=lkrlNGLtidg&list=RDlkrlNGLtidg#t=35
    // https://youtu.be/lkrlNGLtidg?list=RDlkrlNGLtidg
    // <iframe width='560' height='315' src='https://www.youtube.com/embed/lkrlNGLtidg?list=RDlkrlNGLtidg' frameborder='0' allowfullscreen></iframe>
    // example URLs:
    // https://www.youtube.com/watch?v=qrx1vyvtRLY
    // https://youtu.be/qrx1vyvtRLY
    // https://www.youtube.com/watch?v=qrx1vyvtRLY&list=RDqrx1vyvtRLY#t=7644
    // https://www.youtube.com/watch?v=CcsUYu0PVxY&list=RDqrx1vyvtRLY&index=3
    // https://www.youtube.com/watch?v=_JgHVlcaQJ0&index=21&list=RDqrx1vyvtRLY
    let uri = ''
    if (line.slice(0, 32) === 'https://www.youtube.com/watch?v=') {
      // regular url
      uri = line.replace('watch?v=', 'embed/')
        .replace(/#t=\d+/, '').replace(/&index=\d+/, '').replace('&', '?')
    } else if (line.slice(0, 16) === 'https://youtu.be') {
      // short url
      uri = line.replace('https://youtu.be', 'https://www.youtube.com/embed')
    }
    return `<iframe width="420" height="315" src="${uri}" frameborder="0" allowfullscreen></iframe>`
  } else if (line.slice(0, 7) === 'http://') {
    // http
    // youku video?
  }

  return line
}

export default media
