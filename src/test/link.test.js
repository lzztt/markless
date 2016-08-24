import { expect } from 'chai'
import link from '../link'

describe('process link', () => {
  it('link without text title', () => {
    const inLines = [
      'http://www.example.com',
      'https://www.example.com',
      'text http://www.example.com text',
      'text https://www.example.com text',
      'http://www.example.com https://www.example.com',
    ]
    const outLines = [
      '<a href="http://www.example.com">www.example.com</a>',
      '<a href="https://www.example.com">www.example.com</a>',
      'text <a href="http://www.example.com">www.example.com</a> text',
      'text <a href="https://www.example.com">www.example.com</a> text',
      '<a href="http://www.example.com">www.example.com</a> <a href="https://www.example.com">www.example.com</a>',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(link(inLines[i])).to.be.equal(outLines[i])
    }
  })

  it('link with text title', () => {
    const inLines = [
      '[text title http://www.example.com]',
      '[text title https://www.example.com]',
      'text [text title http://www.example.com] text',
      'text [text title https://www.example.com] text',
      'http://www.example.com [text title https://www.example.com]',
      '中文[标题 http://www.example.com]中文',
    ]
    const outLines = [
      '<a href="http://www.example.com">text title</a>',
      '<a href="https://www.example.com">text title</a>',
      'text <a href="http://www.example.com">text title</a> text',
      'text <a href="https://www.example.com">text title</a> text',
      '<a href="http://www.example.com">www.example.com</a> <a href="https://www.example.com">text title</a>',
      '中文<a href="http://www.example.com">标题</a>中文',
    ]

    for (let i = 0; i < inLines.length; i++) {
      expect(link(inLines[i])).to.be.equal(outLines[i])
    }
  })
})
