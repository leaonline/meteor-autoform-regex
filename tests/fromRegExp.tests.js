/* eslint-env mocha */
import { expect } from 'chai'
import { fromRegExp } from '../lib/fromRegExp'

describe(fromRegExp.name, function () {
  it('returns a default if regExp is null or undefined', function () {
    const expected = {
      value: '',
      ignoreCase: false,
      isExactMatch: false
    }
    expect(fromRegExp()).to.deep.equal(expected)
    expect(fromRegExp(undefined)).to.deep.equal(expected)
    expect(fromRegExp(null)).to.deep.equal(expected)
  })
  it('detects, if a regExp is an exact match', function () {
    const expected = {
      value: 'foo',
      ignoreCase: false,
      isExactMatch: true
    }
    const regExp = /^foo$/
    expect(fromRegExp(regExp)).to.deep.equal(expected)
  })
  it('detects, if an ignore case flag is set', function () {
    const expected = {
      value: 'foo',
      ignoreCase: true,
      isExactMatch: false
    }
    const regExp = /foo/i
    expect(fromRegExp(regExp)).to.deep.equal(expected)
  })
})
