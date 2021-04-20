/* eslint-env mocha */
import { expect } from 'chai'
import { updateValue } from '../lib/updateValue'

describe(updateValue.name, function () {
  it('writes a valid regEx into a target a JSON string', function () {
    const data = {
      value: 'foo',
      ignoreCase: false,
      isExactMatch: false
    }
    const hidden = {
      val (str) {
        expect(JSON.parse(str)).to.deep.equal(data)
      }
    }
    const input = {
      val(str) {
        if (str) expect(str).to.equal(data.value)
      }
    }
    updateValue({ input, hidden, ...data })
  })
  it('bubbles up any errors on invalid regEx pattern', function () {
    expect(() => updateValue({ value: '(('})).to.throw('unterminated parenthetical')
  })
})