/* eslint-env mocha */
import { expect } from 'chai'
import { valueOut } from '../lib/valueOut'

describe(valueOut.name, function () {
  it('returns a valid RegExp from valid JSON', function () {
    const str = JSON.stringify({
      value: 'foo',
      ignoreCase: true,
      isExactMatch: true
    })
    const regExp = valueOut(str)
    expect(regExp.test('foo')).to.equal(true)
    expect(regExp.test('Foo')).to.equal(true)
  })
  it('returns undefined on invalid JSON or RegEx', function () {
    expect(valueOut()).to.equal(undefined)
    expect(valueOut(null)).to.equal(undefined)
    expect(valueOut('')).to.equal(undefined)
    expect(valueOut(JSON.stringify({ value: '((' }))).to.equal(undefined)
    expect(valueOut('{ value }')).to.equal(undefined)
  })
})
