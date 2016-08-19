const processText = function(text) {
  console.log('processText', text)
  let sections = text.replace(/\r\n/gm, '\n').trim().split(/\n{2,}/gm)
  return sections.map(processSection).join('')
}

module.exports = processText;
