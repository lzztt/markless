import { expect } from 'chai'
import popHeader from '../popHeader'

describe('process header', () => {
  it('single header line', () => {
    const inLines = ['# header1']
    const outLines = ['<h1>header1</h1>']

    expect(popHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('multiple header lines', () => {
    const inLines = [
      '# header1',
      '## header2',
      '### header3',
    ]
    const outLines = [
      '<h1>header1</h1>',
      '<h2>header2</h2>',
      '<h3>header3</h3>',
    ]

    expect(popHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('stop at first non-header line', () => {
    const inLines = [
      '# header1',
      'not a header',
      '## header2',
    ]
    const outLines = [
      '<h1>header1</h1>',
    ]

    expect(popHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(2)
  })

  it('trim white spaces for header line', () => {
    const inLines = [
      '#    header1   ',
      '##   header2   ',
      '###  header3   ',
    ]
    const outLines = [
      '<h1>header1</h1>',
      '<h2>header2</h2>',
      '<h3>header3</h3>',
    ]

    expect(popHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(0)
  })

  it('support up to h3 (###)', () => {
    const inLines = [
      '### header3',
      '#### header4',
    ]
    const outLines = [
      '<h3>header3</h3>',
    ]

    expect(popHeader(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(1)
  })
})
