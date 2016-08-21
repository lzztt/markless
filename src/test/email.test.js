const expect = require('chai').expect
const email = require('../email.js')

describe('process email', () => {
  it('line with email', () => {
    let inLine = 'text test@example.com text'
    let outLine = 'text <a href="mailto:test@example.com">test@example.com</a> text'
    expect(email(inLine)).to.be.equal(outLine)
  })

  it('line without email', () => {
    let inLine = 'text test@example text'
    let outLine = 'text test@example text'
    expect(email(inLine)).to.be.equal(outLine)
  })

  it('line contains only email', () => {
    let inLine = 'test-test@example_domain.com'
    let outLine = '<a href="mailto:test-test@example_domain.com">test-test@example_domain.com</a>'
    expect(email(inLine)).to.be.equal(outLine)
  })
})
