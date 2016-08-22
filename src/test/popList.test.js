const expect = require('chai').expect
const popList = require('../popList.js')

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

    expect(popList(inLines)).to.be.deep.equal({
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

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ul',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('a list may contain one item', () => {
    let inLines = [
      '1. item 1',
      'not an item'
    ]
    let outItems = [
      ['item 1']
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems
    })
    expect(inLines.length).to.be.equal(1)
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

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('an item can contain sublist', () => {
    let inLines = [
      '1. item 1',
      '2. item 2',
      '   - item 2 1',
      '   - item 2 2',
      '33.  item 3',
      '     1. item 3 1',
      '     2. item 3 2'
    ]
    let outItems = [
      ['item 1'],
      ['item 2', '- item 2 1', '- item 2 2'],
      ['item 3', '1. item 3 1', '2. item 3 2']
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems
    })
    expect(inLines.length).to.be.equal(0)
  })
})
