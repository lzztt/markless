import { expect } from 'chai'
import email from '../email'

describe('process email', () => {
  it('line with email', () => {
    const inLine = 'text test@example.com text'
    const outLine = 'text <a href="mailto:test@example.com">test@example.com</a> text'
    expect(email(inLine)).to.be.equal(outLine)
  })

  it('line without email', () => {
    const inLine = 'text test@example text'
    const outLine = 'text test@example text'
    expect(email(inLine)).to.be.equal(outLine)
  })

  it('line contains only email', () => {
    const inLine = 'test-test@example_domain.com'
    const outLine = '<a href="mailto:test-test@example_domain.com">test-test@example_domain.com</a>'
    expect(email(inLine)).to.be.equal(outLine)
  })
})
