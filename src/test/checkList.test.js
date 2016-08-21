const expect = require('chai').expect
const checkList = require('../checkList.js')

describe('process list', () => {
  it('ordered list', () => {
    let inLines = [
      '1. item 1',
      '2. item 2',
      '33.  item 3'
    ]
    let outItems = [
      ['item 1'],
      ['item 2'],
      ['item 3']
    ]

    expect(checkList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('unordered list', () => {
    let inLines = [
      '- item 1',
      '-  item 2',
      '- item 3'
    ]
    let outItems = [
      ['item 1'],
      ['item 2'],
      ['item 3']
    ]

    expect(checkList(inLines)).to.be.deep.equal({
      type: 'ul',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('a list contains at least two items', () => {
    let inLines = [
      '1. item 1',
      '   item 1 continue',
      'not an item'
    ]
    let outItems = []

    expect(checkList(inLines)).to.be.deep.equal({
      type: null,
      items: outItems
    })
    expect(inLines.length).to.be.equal(3)
  })

  it('multi-line items', () => {
    let inLines = [
      '1. item 1',
      '2. item 2',
      '   item 2 continue',
      '33.  item 3',
      '     item 3 continue'
    ]
    let outItems = [
      ['item 1'],
      ['item 2', 'item 2 continue'],
      ['item 3', 'item 3 continue']
    ]

    expect(checkList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })
})
