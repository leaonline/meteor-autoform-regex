/* eslint-env mocha */
import { expect } from 'chai'
import { toRegExp } from '../lib/toRegexp'

describe(toRegExp.name, function () {
  it('creates a valid regExp from input', function () {
    const regExp = toRegExp({
      value: 'foo',
      isExactMatch: false,
      ignoreCase: false
    })
    expect(regExp.test('foo')).to.equal(true)
    expect(regExp.test('a foo bar')).to.equal(true)
    expect(regExp.test('a Foo bar')).to.equal(false)

    const regExpIgnore = toRegExp({
      value: 'foo',
      isExactMatch: false,
      ignoreCase: true
    })
    expect(regExpIgnore.test('foo')).to.equal(true)
    expect(regExpIgnore.test('a foo bar')).to.equal(true)
    expect(regExpIgnore.test('a Foo bar')).to.equal(true)

    const regExpExact = toRegExp({
      value: 'foo',
      isExactMatch: true,
      ignoreCase: false
    })
    expect(regExpExact.test('foo')).to.equal(true)
    expect(regExpExact.test('a foo bar')).to.equal(false)
    expect(regExpExact.test('afoobar')).to.equal(false)
    expect(regExpExact.test('a Foo bar')).to.equal(false)
  })

  it('throws on invalid pattern', function () {
    expect(() => toRegExp({
      value: '(('
    })).to.throw('unterminated parenthetical')
  })
})
