const reEmail = /(([\w\-\.]{2,})@([\w\-]{2,20}\.){1,3}\w{2,6})/g

const email = (line) => {
  // can be any part of the line
  if (!line.includes('@')) {
    return line
  }

  return line.replace(reEmail, '<a href="mailto:$1">$1</a>')
}

export default email
