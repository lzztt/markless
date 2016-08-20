const expect = require('chai').expect
const checkHeader = require('../checkHeader.js')

describe('process header', () => {
  it('single header line', () => {
    let inLines = ['# header1']
    let outLines = ['<h1>header1</h1>']

    expect(checkHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('multiple header lines', () => {
    let inLines = [
      '# header1',
      '## header2',
      '### header3'
    ]
    let outLines = [
      '<h1>header1</h1>',
      '<h2>header2</h2>',
      '<h3>header3</h3>'
    ]

    expect(checkHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('stop at first non-header line', () => {
    let inLines = [
      '# header1',
      'not a header',
      '## header2'
    ]
    let outLines = [
      '<h1>header1</h1>'
    ]

    expect(checkHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(2)
  })

  it('trim white spaces for header line', () => {
    let inLines = [
      '#    header1   ',
      '##   header2   ',
      '###  header3   ',
    ]
    let outLines = [
      '<h1>header1</h1>',
      '<h2>header2</h2>',
      '<h3>header3</h3>'
    ]

    expect(checkHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('support up to h3 (###)', () => {
    let inLines = [
      '### header3',
      '#### header4'
    ]
    let outLines = [
      '<h3>header3</h3>'
    ]

    expect(checkHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(1)
  })
})
