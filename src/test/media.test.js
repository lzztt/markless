import { expect } from 'chai'
import media from '../media'

describe('process media link', () => {
  it('youtube media link', () => {
    const inLines = [
      'https://www.youtube.com/watch?v=lkrlNGLtidg',
      'https://youtu.be/lkrlNGLtidg',
      'https://www.youtube.com/watch?v=lkrlNGLtidg&list=RDlkrlNGLtidg#t=126',
      'https://youtu.be/lkrlNGLtidg?list=RDlkrlNGLtidg',
      'https://www.youtube.com/watch?v=lkrlNGLtidg&index=1&list=RDlkrlNGLtidg',
    ]
    const outLines = [
      'lkrlNGLtidg',
      'lkrlNGLtidg',
      'lkrlNGLtidg?list=RDlkrlNGLtidg',
      'lkrlNGLtidg?list=RDlkrlNGLtidg',
      'lkrlNGLtidg?list=RDlkrlNGLtidg',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(media(inLines[i])).to.be.equal(`<iframe width="420" height="315" src="https://www.youtube.com/embed/${outLines[i]}" frameborder="0" allowfullscreen></iframe>`)
    }
  })

  it('media uri should be the whole line', () => {
    const inLines = [
      ' https://www.youtube.com/watch?v=lkrlNGLtidg',
      'thttps://youtu.be/lkrlNGLtidg',
      '1https://www.youtube.com/watch?v=lkrlNGLtidg',
      't https://youtu.be/lkrlNGLtidg',
      'https://www.youtube.com/watch?v=lkrlNGLtidg ',
      'https://youtu.be/lkrlNGLtidg t',
    ]
    const outLines = [
      ' https://www.youtube.com/watch?v=lkrlNGLtidg',
      'thttps://youtu.be/lkrlNGLtidg',
      '1https://www.youtube.com/watch?v=lkrlNGLtidg',
      't https://youtu.be/lkrlNGLtidg',
      'https://www.youtube.com/watch?v=lkrlNGLtidg ',
      'https://youtu.be/lkrlNGLtidg t',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(media(inLines[i])).to.be.equal(outLines[i])
    }
  })
})
