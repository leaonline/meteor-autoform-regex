import { EJSON } from 'meteor/ejson'
import { toRegExp } from './toRegexp'

export const valueOut = valueStr => {
  if (typeof valueStr !== 'string' || !valueStr.length) return

  try {
    const { value, ignoreCase, isExactMatch } = EJSON.parse(valueStr)
    return toRegExp({ value, isExactMatch, ignoreCase })
  } catch (e) {
    console.error(e)
  }
}
