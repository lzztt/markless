import { expect } from 'chai'
import processText from '../processText'

describe('process text', () => {
  it('plain text paragraph', () => {
    const input = `text text
text text`
    const output = '<p>text text text text</p>'

    expect(processText(input)).to.be.equal(output)
  })

  it('with header', () => {
    const input = `# header 1
text text
# header 2
text text`
    const output = '<h1>header 1</h1>' +
      '<p>text text</p>' +
      '<h1>header 2</h1>' +
      '<p>text text</p>'

    expect(processText(input)).to.be.equal(output)
  })

  it('paragraph with empty lines', () => {
    const input = `text text

text text`
    const output = '<p>text text</p><p>text text</p>'

    expect(processText(input)).to.be.equal(output)
  })

  it('pagagraph with inline images', () => {
    const input = `text text
/data/image-1.jpg
[http://www.example.com /data/image-1.jpg]
http://example.com/data/image-1.jpg
text text`
    const output = '<p>text text</p>' +
      '<p><img src="/data/image-1.jpg"> ' +
      '<a href="http://www.example.com"><img src="/data/image-1.jpg"></a> ' +
      '<img src="http://example.com/data/image-1.jpg"></p>' +
      '<p>text text</p>'
    expect(processText(input)).to.be.equal(output)
  })

  it('paragraph with block image', () => {
    const input = `text text
/data/image-1.jpg
[text /data/image-1.jpg]
http://example.com/data/image-1.jpg
text text`
    const output = '<p>text text</p>' +
      '<p><img src="/data/image-1.jpg"></p>' +
      '<figure><figcaption>text</figcaption><img src="/data/image-1.jpg"></figure>' +
      '<p><img src="http://example.com/data/image-1.jpg"></p>' +
      '<p>text text</p>'
    expect(processText(input)).to.be.equal(output)
  })

  it('pagagraph with media', () => {
    const input = `text text
https://www.youtube.com/watch?v=lkrlNGLtidg
text text`
    const output = '<p>text text</p>' +
      '<iframe width="420" height="315" src="https://www.youtube.com/embed/lkrlNGLtidg" frameborder="0" allowfullscreen></iframe>' +
      '<p>text text</p>'
    expect(processText(input)).to.be.equal(output)
  })

  it('paragraph with quote', () => {
    const input = `text text
> quote 1
> quote 2
text text`
    const output = '<p>text text</p>' +
      '<blockquote>quote 1 quote 2</blockquote>' +
      '<p>text text</p>'

    expect(processText(input)).to.be.equal(output)
  })

  it('quote with header and styled font', () => {
    const input = `text text
> # header 1
> quote *bold*
text text`
    const output = '<p>text text</p>' +
      '<blockquote><h1>header 1</h1><p>quote <b>bold</b></p></blockquote>' +
      '<p>text text</p>'

    expect(processText(input)).to.be.equal(output)
  })

  it('paragraph with list', () => {
    const input = `text text
1. item 1
2. item 2
> text text
- item 3
- item 4`
    const output = '<p>text text</p>' +
      '<ol><li>item 1</li><li>item 2</li></ol>' +
      '<blockquote>text text</blockquote>' +
      '<ul><li>item 3</li><li>item 4</li></ul>'

    expect(processText(input)).to.be.equal(output)
  })

  it('list with styled font and mutiple line items', () => {
    const input = `text text
1. item 1
   item 1 _underline_
2. item 2
> text text
- item 3
- item 4`
    const output = '<p>text text</p>' +
      '<ol><li>item 1 item 1 <u>underline</u></li><li>item 2</li></ol>' +
      '<blockquote>text text</blockquote>' +
      '<ul><li>item 3</li><li>item 4</li></ul>'

    expect(processText(input)).to.be.equal(output)
  })

  it('quote with list', () => {
    const input = `text text
> text text
> 1. item 1
>    item 1 _underline_
> - item 3
> - item 4`
    const output = '<p>text text</p><blockquote><p>text text</p>' +
      '<ol><li>item 1 item 1 <u>underline</u></li></ol>' +
      '<ul><li>item 3</li><li>item 4</li></ul></blockquote>'

    expect(processText(input)).to.be.equal(output)
  })

  it('list with quote', () => {
    const input = `text text
1. item 1
   > quote 1
   > quote 2 *bold*
   item 1 _underline_
2. item 2
- item 3
  > quote 3
- item 4`
    const output = '<p>text text</p>' +
      '<ol><li><p>item 1</p><blockquote>quote 1 quote 2 <b>bold</b></blockquote>' +
      '<p>item 1 <u>underline</u></p></li><li>item 2</li></ol>' +
      '<ul><li><p>item 3</p><blockquote>quote 3</blockquote></li><li>item 4</li></ul>'

    expect(processText(input)).to.be.equal(output)
  })

  it('list with sublist', () => {
    const input = `text text
1. item 1
   - item 11
     item 11 _underline_
   item 1 *bold*
2. item 2
   1. item 21
- item 3
  1. item 31
- item 4
  - item 41`
    const output = '<p>text text</p>' +
      '<ol><li><p>item 1</p><ul><li>item 11 item 11 <u>underline</u></li></ul>' +
      '<p>item 1 <b>bold</b></p></li>' +
      '<li>item 2<ol><li>item 21</li></ol></li></ol>' +
      '<ul><li>item 3<ol><li>item 31</li></ol></li>' +
      '<li>item 4<ul><li>item 41</li></ul></li></ul>'

    expect(processText(input)).to.be.equal(output)
  })

  it('list would stop if hit empty line', () => {
    const input = `text text
1. item 1

2. item 2`
    const output = '<p>text text</p>' +
      '<ol><li>item 1</li></ol>' +
      '<ol><li>item 2</li></ol>'

    expect(processText(input)).to.be.equal(output)
  })

  it('paragraph would stop if hit empty line', () => {
    const input = `text text

text text`
    const output = '<p>text text</p><p>text text</p>'

    expect(processText(input)).to.be.equal(output)
  })
})
