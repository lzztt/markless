const reB = /\*([^\s\*][^\*]*[^\s\*])\*/g
const reS = /~([^\s~][^~]*[^\s~])~/g
const reU = /_([^\s_][^_]*[^\s_])_/g

const reFR = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) r\]/g
const reFG = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) g\]/g
const reFB = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) b\]/g

const reBR = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) r!\]/g
const reBG = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) g!\]/g
const reBB = /\[([^\s\[\]][^\[\]]*[^\s\[\]]) b!\]/g

const font = (line) => {
  // must be less than 50% of the line
  // no leading or trailing spaces
  let ret = line
    .replace(reB, '<b>$1</b>')
    .replace(reS, '<s>$1</s>')
    .replace(reU, '<u>$1</u>')

  // mark / hightlight
  // [text r] [text r!], color can be red, blue, green
  if (ret.includes(']')) {
    ret = ret
      .replace(reFR, '<em class="fc-red">$1</em>')
      .replace(reFG, '<em class="fc-green">$1</em>')
      .replace(reFB, '<em class="fc-blue">$1</em>')
    if (ret.includes('!]')) {
      ret = ret
        .replace(reBR, '<em class="bc-red">$1</em>')
        .replace(reBG, '<em class="bc-green">$1</em>')
        .replace(reBB, '<em class="bc-blue">$1</em>')
    }
  }

  return ret
}

export default font
