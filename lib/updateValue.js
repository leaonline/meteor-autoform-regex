import { EJSON } from 'meteor/ejson'
import { toRegExp } from './toRegexp'

export const updateValue = ({ value, ignoreCase = false, isExactMatch = false, input, hidden }) => {
  if (typeof value !== 'string' || value.length === 0) {
    return hidden.val(null)
  }

  // sanity check: throws, in case this may be an invalid RegExp
  toRegExp({ value, ignoreCase, isExactMatch })

  if (input.val() !== value) {
    input.val(value)
  }

  const str = EJSON.stringify({ value, ignoreCase, isExactMatch })
  return hidden.val(str)
}
