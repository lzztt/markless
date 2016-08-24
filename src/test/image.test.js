import { expect } from 'chai'
import image from '../image'

describe('process image', () => {
  it('relative image uri without text title', () => {
    const inLines = [
      '/data/image-1.jpg',
      '/data/image-1.jpeg',
      '/data/image-1.png',
      '/data/image-1.gif',
      '/data/no-image.pdf',
    ]
    const outLines = [
      '<img src="/data/image-1.jpg">',
      '<img src="/data/image-1.jpeg">',
      '<img src="/data/image-1.png">',
      '<img src="/data/image-1.gif">',
      '/data/no-image.pdf',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('relative image uri should be the whole line', () => {
    const inLines = [
      ' /data/image-1.jpg',
      't/data/image-1.jpeg',
      '1/data/image-1.png',
      't /data/image-1.gif',
      '/data/image-1.jpg ',
      '/data/image-1.jpegt',
      '/data/image-1.png1',
      '/data/image-1.gif t',
    ]
    const outLines = [
      ' /data/image-1.jpg',
      't/data/image-1.jpeg',
      '1/data/image-1.png',
      't /data/image-1.gif',
      '/data/image-1.jpg ',
      '/data/image-1.jpegt',
      '/data/image-1.png1',
      '/data/image-1.gif t',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('absolute image uri without text title', () => {
    const inLines = [
      'http://example.com/data/image-1.jpg',
      'http://img.example.com/data/image-1.jpeg',
      'http://example.com/data/image-1.png',
      'http://img.example.com/data/image-1.gif',
      'http://example.com/data/no-image.pdf',
      'https://example.com/data/image-1.jpg',
      'https://img.example.com/data/image-1.jpeg',
      'https://example.com/data/image-1.png',
      'https://img.example.com/data/image-1.gif',
      'https://example.com/data/no-image.pdf',
    ]
    const outLines = [
      '<img src="http://example.com/data/image-1.jpg">',
      '<img src="http://img.example.com/data/image-1.jpeg">',
      '<img src="http://example.com/data/image-1.png">',
      '<img src="http://img.example.com/data/image-1.gif">',
      'http://example.com/data/no-image.pdf',
      '<img src="https://example.com/data/image-1.jpg">',
      '<img src="https://img.example.com/data/image-1.jpeg">',
      '<img src="https://example.com/data/image-1.png">',
      '<img src="https://img.example.com/data/image-1.gif">',
      'https://example.com/data/no-image.pdf',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('absolute image uri should be the whole line', () => {
    const inLines = [
      ' http://example.com/data/image-1.jpg',
      'thttp://img.example.com/data/image-1.jpeg',
      '1http://example.com/data/image-1.png',
      't http://img.example.com/data/image-1.gif',
      ' https://example.com/data/image-1.jpg',
      'thttps://img.example.com/data/image-1.jpeg',
      '1https://example.com/data/image-1.png',
      't https://img.example.com/data/image-1.gif',
      'http://example.com/data/image-1.jpg ',
      'http://img.example.com/data/image-1.jpegt',
      'http://example.com/data/image-1.png1',
      'http://img.example.com/data/image-1.gif t',
      'https://example.com/data/image-1.jpg ',
      'https://img.example.com/data/image-1.jpegt',
      'https://example.com/data/image-1.png1',
      'https://img.example.com/data/image-1.gif t',
    ]
    const outLines = [
      ' http://example.com/data/image-1.jpg',
      'thttp://img.example.com/data/image-1.jpeg',
      '1http://example.com/data/image-1.png',
      't http://img.example.com/data/image-1.gif',
      ' https://example.com/data/image-1.jpg',
      'thttps://img.example.com/data/image-1.jpeg',
      '1https://example.com/data/image-1.png',
      't https://img.example.com/data/image-1.gif',
      'http://example.com/data/image-1.jpg ',
      'http://img.example.com/data/image-1.jpegt',
      'http://example.com/data/image-1.png1',
      'http://img.example.com/data/image-1.gif t',
      'https://example.com/data/image-1.jpg ',
      'https://img.example.com/data/image-1.jpegt',
      'https://example.com/data/image-1.png1',
      'https://img.example.com/data/image-1.gif t',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('relative image uri with text title', () => {
    const inLines = [
      '[text /data/image-1.jpg]',
      '[text title /data/image-1.jpeg]',
      '[text /data/image-1.png]',
      '[text   title /data/image-1.gif]',
      '[text no-image.pdf]',
    ]
    const outLines = [
      '<figure><figcaption>text</figcaption><img src="/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="/data/image-1.jpeg"></figure>',
      '<figure><figcaption>text</figcaption><img src="/data/image-1.png"></figure>',
      '<figure><figcaption>text   title</figcaption><img src="/data/image-1.gif"></figure>',
      '[text no-image.pdf]',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('relative image uri with text title', () => {
    const inLines = [
      '[text /data/image-1.jpg]',
      '[text title /data/image-1.jpeg]',
      '[text /data/image-1.png]',
      '[text   title /data/image-1.gif]',
      '[text no-image.pdf]',
    ]
    const outLines = [
      '<figure><figcaption>text</figcaption><img src="/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="/data/image-1.jpeg"></figure>',
      '<figure><figcaption>text</figcaption><img src="/data/image-1.png"></figure>',
      '<figure><figcaption>text   title</figcaption><img src="/data/image-1.gif"></figure>',
      '[text no-image.pdf]',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('relative image uri with text title should be the whole line', () => {
    const inLines = [
      ' [text /data/image-1.jpg]',
      't[text /data/image-1.jpg]',
      '1[text /data/image-1.jpg]',
      't [text /data/image-1.jpg]',
      '[text /data/image-1.jpg] ',
      '[text /data/image-1.jpg]t',
      '[text /data/image-1.jpg]1',
      '[text /data/image-1.jpg] t',
    ]
    const outLines = [
      ' [text /data/image-1.jpg]',
      't[text /data/image-1.jpg]',
      '1[text /data/image-1.jpg]',
      't [text /data/image-1.jpg]',
      '[text /data/image-1.jpg] ',
      '[text /data/image-1.jpg]t',
      '[text /data/image-1.jpg]1',
      '[text /data/image-1.jpg] t',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('absolute image uri with text title', () => {
    const inLines = [
      '[text http://example.com/data/image-1.jpg]',
      '[text title http://img.example.com/data/image-1.jpeg]',
      '[text http://example.com/data/image-1.png]',
      '[text   title http://img.example.com/data/image-1.gif]',
      '[text https://example.com/data/image-1.jpg]',
      '[text title https://img.example.com/data/image-1.jpeg]',
      '[text https://example.com/data/image-1.png]',
      '[text   title https://img.example.com/data/image-1.gif]',
    ]
    const outLines = [
      '<figure><figcaption>text</figcaption><img src="http://example.com/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="http://img.example.com/data/image-1.jpeg"></figure>',
      '<figure><figcaption>text</figcaption><img src="http://example.com/data/image-1.png"></figure>',
      '<figure><figcaption>text   title</figcaption><img src="http://img.example.com/data/image-1.gif"></figure>',
      '<figure><figcaption>text</figcaption><img src="https://example.com/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="https://img.example.com/data/image-1.jpeg"></figure>',
      '<figure><figcaption>text</figcaption><img src="https://example.com/data/image-1.png"></figure>',
      '<figure><figcaption>text   title</figcaption><img src="https://img.example.com/data/image-1.gif"></figure>',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('absolute image uri with text title should be the whole line', () => {
    const inLines = [
      ' [text http://example.com/data/image-1.jpg]',
      't[text title http://img.example.com/data/image-1.jpeg]',
      '1[text http://example.com/data/image-1.png]',
      't [text   title http://img.example.com/data/image-1.gif]',
      ' [text https://example.com/data/image-1.jpg]',
      't[text title https://img.example.com/data/image-1.jpeg]',
      '1[text https://example.com/data/image-1.png]',
      't [text   title https://img.example.com/data/image-1.gif]',
      '[text http://example.com/data/image-1.jpg] ',
      '[text title http://img.example.com/data/image-1.jpeg]t',
      '[text http://example.com/data/image-1.png]1',
      '[text   title http://img.example.com/data/image-1.gif] t',
      '[text https://example.com/data/image-1.jpg] ',
      '[text title https://img.example.com/data/image-1.jpeg]t',
      '[text https://example.com/data/image-1.png]1',
      '[text   title https://img.example.com/data/image-1.gif] t',
    ]
    const outLines = [
      ' [text http://example.com/data/image-1.jpg]',
      't[text title http://img.example.com/data/image-1.jpeg]',
      '1[text http://example.com/data/image-1.png]',
      't [text   title http://img.example.com/data/image-1.gif]',
      ' [text https://example.com/data/image-1.jpg]',
      't[text title https://img.example.com/data/image-1.jpeg]',
      '1[text https://example.com/data/image-1.png]',
      't [text   title https://img.example.com/data/image-1.gif]',
      '[text http://example.com/data/image-1.jpg] ',
      '[text title http://img.example.com/data/image-1.jpeg]t',
      '[text http://example.com/data/image-1.png]1',
      '[text   title http://img.example.com/data/image-1.gif] t',
      '[text https://example.com/data/image-1.jpg] ',
      '[text title https://img.example.com/data/image-1.jpeg]t',
      '[text https://example.com/data/image-1.png]1',
      '[text   title https://img.example.com/data/image-1.gif] t',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('only 1 space between title and image uri', () => {
    const inLines = [
      '[text title /data/image-1.jpg]',
      '[text title http://example.com/data/image-1.jpg]',
      '[text title https://img.example.com/data/image-1.jpg]',
      '[text title  /data/image-1.jpg]',
      '[text title  http://example.com/data/image-1.jpg]',
      '[text title  https://img.example.com/data/image-1.jpg]',
    ]
    const outLines = [
      '<figure><figcaption>text title</figcaption><img src="/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="http://example.com/data/image-1.jpg"></figure>',
      '<figure><figcaption>text title</figcaption><img src="https://img.example.com/data/image-1.jpg"></figure>',
      '[text title  /data/image-1.jpg]',
      '[text title  http://example.com/data/image-1.jpg]',
      '[text title  https://img.example.com/data/image-1.jpg]',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(image(inLines[i])).to.be.equal(outLines[i])
    }
  })
})
