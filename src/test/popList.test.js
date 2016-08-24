import { expect } from 'chai'
import popList from '../popList'

describe('process list', () => {
  it('ordered list', () => {
    const inLines = [
      '1. item 1',
      '2. item 2',
      '33.  item 3',
    ]
    const outItems = [
      ['item 1'],
      ['item 2'],
      ['item 3'],
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems,
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('unordered list', () => {
    const inLines = [
      '- item 1',
      '-  item 2',
      '- item 3',
    ]
    const outItems = [
      ['item 1'],
      ['item 2'],
      ['item 3'],
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ul',
      items: outItems,
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('pop nothing if not a list', () => {
    const inLines = [
      'text text',
      'not an item',
    ]

    expect(popList(inLines)).to.be.equal(null)
    expect(inLines.length).to.be.equal(2)
  })

  it('a list may contain one item', () => {
    const inLines = [
      '1. item 1',
      'not an item',
    ]
    const outItems = [
      ['item 1'],
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems,
    })
    expect(inLines.length).to.be.equal(1)
  })

  it('multi-line items', () => {
    const inLines = [
      '1. item 1',
      '2. item 2',
      '   item 2 continue',
      '33.  item 3',
      '     item 3 continue',
    ]
    const outItems = [
      ['item 1'],
      ['item 2', 'item 2 continue'],
      ['item 3', 'item 3 continue'],
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems,
    })
    expect(inLines.length).to.be.equal(0)
  })

  it('an item can contain sublist', () => {
    const inLines = [
      '1. item 1',
      '2. item 2',
      '   - item 2 1',
      '     item 2 1 continue',
      '   - item 2 2',
      '33.  item 3',
      '     1. item 3 1',
      '     2. item 3 2',
    ]
    const outItems = [
      ['item 1'],
      ['item 2', '- item 2 1', '  item 2 1 continue', '- item 2 2'],
      ['item 3', '1. item 3 1', '2. item 3 2'],
    ]

    expect(popList(inLines)).to.be.deep.equal({
      type: 'ol',
      items: outItems,
    })
    expect(inLines.length).to.be.equal(0)
  })
})
