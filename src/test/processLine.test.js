import { expect } from 'chai'
import processLine from '../processLine'

describe('process line', () => {
  it('process line with links, email, fonts, and escapes', () => {
    const inLines = [
      'text http://www.example.com [Example.com https://www.example.com] text',
      'text email@example.com text',
      'text *bold* ~_strike text_~ text',
      'text [red r] [*green text* g!]',
      'text [red `r] _strike` text_ [*green* g!]',
      'text *bold* `text',
      '中文*粗体*~删除~[绿色_下划线_ g!]中文',
    ]
    const outLines = [
      'text <a href="http://www.example.com">www.example.com</a> <a href="https://www.example.com">Example.com</a> text',
      'text <a href="mailto:email@example.com">email@example.com</a> text',
      'text <b>bold</b> <s><u>strike text</u></s> text',
      'text <em class="fc-red">red</em> <em class="bc-green"><b>green text</b></em>',
      'text [red <em class="code">r] _strike</em> text_ <em class="bc-green"><b>green</b></em>',
      'text <b>bold</b> `text',
      '中文<b>粗体</b><s>删除</s><em class="bc-green">绿色<u>下划线</u></em>中文',
    ]

    for (let i = 0; i < inLines.length; i++) {
      const line = processLine(inLines[i])
      expect(line.type).to.be.equal('text')
      expect(line.body).to.be.equal(outLines[i])
    }
  })

  it('process line with block images, inline images and media lines', () => {
    const inLines = [
      '[http://example.com /data/image-1.jpg]',
      'https://youtu.be/lkrlNGLtidg',
      'text email@example.com text',
      '[text /data/image-1.jpg]',
    ]
    const outLines = [{
      type: 'inlineImage',
      body: '<a href="http://example.com"><img src="/data/image-1.jpg"></a>',
    }, {
      type: 'media',
      body: '<iframe width="420" height="315" src="https://www.youtube.com/embed/lkrlNGLtidg" frameborder="0" allowfullscreen></iframe>',
    }, {
      type: 'text',
      body: 'text <a href="mailto:email@example.com">email@example.com</a> text',
    }, {
      type: 'blockImage',
      body: '<figure><figcaption>text</figcaption><img src="/data/image-1.jpg"></figure>',
    }]

    for (let i = 0; i < inLines.length; i++) {
      expect(processLine(inLines[i])).to.be.deep.equal(outLines[i])
    }
  })
})
