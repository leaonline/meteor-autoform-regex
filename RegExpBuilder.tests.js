import { expect } from 'chai'
import { RegExpBuilder } from './RegExpBuilder'

const test = (str, pattern) => expect(pattern.test(str)).to.equal(true)

describe('basic', function () {
  it ('creates a basic regexp', function () {
    const str = 'hello, world'
    const pattern = new RegExpBuilder()
      .add(str)
      .build()
    test(str, pattern)
  })
})