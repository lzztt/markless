const expect = require('chai').expect
const font = require('../font.js')

describe('process font style', () => {
  it('bold text with single word', () => {
    let inLine = 'text *bold* text'
    let outLine = 'text <b>bold</b> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text with multiple words', () => {
    let inLine = 'text *bold bold* text'
    let outLine = 'text <b>bold bold</b> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text cannot have leading spaces', () => {
    let inLine = 'text * bold bold* text'
    let outLine = 'text * bold bold* text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('bold text cannot have trailing spaces', () => {
    let inLine = 'text *bold bold * text'
    let outLine = 'text *bold bold * text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('strike text with single word', () => {
    let inLine = 'text ~strike~ text'
    let outLine = 'text <s>strike</s> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text with multiple words', () => {
    let inLine = 'text ~strike strike~ text'
    let outLine = 'text <s>strike strike</s> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text cannot have leading spaces', () => {
    let inLine = 'text ~ strike strike~ text'
    let outLine = 'text ~ strike strike~ text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('strike text cannot have trailing spaces', () => {
    let inLine = 'text ~strike strike ~ text'
    let outLine = 'text ~strike strike ~ text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('underline text with single word', () => {
    let inLine = 'text _underline_ text'
    let outLine = 'text <u>underline</u> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text with multiple words', () => {
    let inLine = 'text _underline underline_ text'
    let outLine = 'text <u>underline underline</u> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text cannot have leading spaces', () => {
    let inLine = 'text _ underline underline_ text'
    let outLine = 'text _ underline underline_ text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('underline text cannot have trailing spaces', () => {
    let inLine = 'text _underline underline _ text'
    let outLine = 'text _underline underline _ text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('font with color', () => {
    let inLine = 'text [red r] [blue b] [green g] text'
    let outLine = 'text <em class="fc-red">red</em> <em class="fc-blue">blue</em> <em class="fc-green">green</em> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with color cannot have leading spaces', () => {
    let inLine = 'text [ red r] [blue b] [ green g] text'
    let outLine = 'text [ red r] <em class="fc-blue">blue</em> [ green g] text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with color cannot have trailing spaces', () => {
    let inLine = 'text [red  r] [blue b] [green  g] text'
    let outLine = 'text [red  r] <em class="fc-blue">blue</em> [green  g] text'
    expect(font(inLine)).to.be.equal(outLine)
  })


  it('font with background color', () => {
    let inLine = 'text [red r!] [blue b!] [green g!] text'
    let outLine = 'text <em class="bc-red">red</em> <em class="bc-blue">blue</em> <em class="bc-green">green</em> text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with background color cannot have leading spaces', () => {
    let inLine = 'text [ red r!] [blue b!] [ green g!] text'
    let outLine = 'text [ red r!] <em class="bc-blue">blue</em> [ green g!] text'
    expect(font(inLine)).to.be.equal(outLine)
  })

  it('font with background color cannot have trailing spaces', () => {
    let inLine = 'text [red  r!] [blue b!] [green  g!] text'
    let outLine = 'text [red  r!] <em class="bc-blue">blue</em> [green  g!] text'
    expect(font(inLine)).to.be.equal(outLine)
  })
})
