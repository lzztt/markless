const expect = require('chai').expect
const popQuote = require('../popQuote.js')

describe('process quote', () => {
  it('quote', () => {
    let inLines = [
      '> text 1',
      '> text 2',
      '>not a quote line',
      'not a quote line'
    ]
    let outLines = [
      'text 1',
      'text 2'
    ]

    expect(popQuote(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(2)
  })
})
