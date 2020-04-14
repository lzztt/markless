import { expect } from 'chai'
import font from '../font'

describe('process font style', () => {
  it('bold text with single word', () => {
    const inLine = 'text *bold* text'
    const outLine = 'text <b>bold</b> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text with multiple words', () => {
    const inLine = 'text *bold bold* text'
    const outLine = 'text <b>bold bold</b> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text cannot have leading spaces', () => {
    const inLine = 'text * bold bold* text'
    const outLine = 'text * bold bold* text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text cannot have trailing spaces', () => {
    const inLine = 'text *bold bold * text'
    const outLine = 'text *bold bold * text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('strike text with single word', () => {
    const inLine = 'text ~strike~ text'
    const outLine = 'text <s>strike</s> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text with multiple words', () => {
    const inLine = 'text ~strike strike~ text'
    const outLine = 'text <s>strike strike</s> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text cannot have leading spaces', () => {
    const inLine = 'text ~ strike strike~ text'
    const outLine = 'text ~ strike strike~ text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text cannot have trailing spaces', () => {
    const inLine = 'text ~strike strike ~ text'
    const outLine = 'text ~strike strike ~ text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('underline text with single word', () => {
    const inLine = 'text _underline_ text'
    const outLine = 'text <u>underline</u> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text with multiple words', () => {
    const inLine = 'text _underline underline_ text'
    const outLine = 'text <u>underline underline</u> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text cannot have leading spaces', () => {
    const inLine = 'text _ underline underline_ text'
    const outLine = 'text _ underline underline_ text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text cannot have trailing spaces', () => {
    const inLine = 'text _underline underline _ text'
    const outLine = 'text _underline underline _ text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('font with color', () => {
    const inLine = 'text [red r] [blue b] [green g] text'
    const outLine = 'text <em class="fc-red">red</em> <em class="fc-blue">blue</em> '
      + '<em class="fc-green">green</em> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with color cannot have leading spaces', () => {
    const inLine = 'text [ red r] [blue b] [ green g] text'
    const outLine = 'text [ red r] <em class="fc-blue">blue</em> [ green g] text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with color cannot have trailing spaces', () => {
    const inLine = 'text [red  r] [blue b] [green  g] text'
    const outLine = 'text [red  r] <em class="fc-blue">blue</em> [green  g] text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('font with background color', () => {
    const inLine = 'text [red r!] [blue b!] [green g!] text'
    const outLine = 'text <em class="bc-red">red</em> <em class="bc-blue">blue</em> '
      + '<em class="bc-green">green</em> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with background color cannot have leading spaces', () => {
    const inLine = 'text [ red r!] [blue b!] [ green g!] text'
    const outLine = 'text [ red r!] <em class="bc-blue">blue</em> [ green g!] text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with background color cannot have trailing spaces', () => {
    const inLine = 'text [red  r!] [blue b!] [green  g!] text'
    const outLine = 'text [red  r!] <em class="bc-blue">blue</em> [green  g!] text'
    expect(font(inLine)).to.be.equal(outLine)
  })
})
