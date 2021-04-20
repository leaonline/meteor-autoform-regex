/**
 * Parses a given value into it's parts.
 * @param regExp {RegExp?} a regex
 * @return {{cleanedValue: string?, isExactMatch: boolean, ignoreCase: boolean}}
 */
export const fromRegExp = regExp => {
  const source = regExp?.source
  const out = {
    value: source || '',
    isExactMatch: false,
    ignoreCase: false
  }

  if (source && source.startsWith('^') && source.endsWith('$')) {
    out.value = source.substring(1, source.length - 1)
    out.isExactMatch = true
  }

  if (regExp?.flags && regExp.flags.includes('i')) {
    out.ignoreCase = true
  }

  return out
}
