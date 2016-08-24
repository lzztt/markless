import { expect } from 'chai'
import popQuote from '../popQuote'

describe('process quote', () => {
  it('quote', () => {
    const inLines = [
      '> text 1',
      '> text 2',
      '>not a quote line',
      'not a quote line',
    ]
    const outLines = [
      'text 1',
      'text 2',
    ]

    expect(popQuote(inLines)).to.be.deep.equal(outLines)
    expect(inLines.length).to.be.equal(2)
  })
})
