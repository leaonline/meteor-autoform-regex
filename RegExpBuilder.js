export class RegExpBuilder {

  static ANY = '.'
  static NOT = '^'
  static START = '^'
  static END = '$'
  static OR = '|'
  static WORD = '\w'
  static DIGIT = '\d'
  static WHITE_SPACE = '\s'
  static NOT_WORD = '\W'
  static NOT_DIGIT = '\D'
  static NOT_WHITE_SPACE = '\S'
  static TAB = '\t'
  static LINEFEED = '\n'
  static CARRIAGE_RETURN = '\r'
  static ZERO_OR_ONE = '?'
  static ZERO_OR_MORE = '*'
  static ONE_OR_MORE = '+'

  constructor ({ ignore, global, multiline } = {}) {
    this.stack = []
    this.options = { ignore, global, multiline }
    return this
  }

  start () {

  }

  end () {

  }

  withLength (min, max) {
    return this.add(lengthOf(min, max))
  }

  add (...items) {
    this.stack.push.apply(this.stack, items)
    return this
  }

  charsAt (index, chars) {
    return this.add(
      RegExpBuilder.START,
      RegExpBuilder.ANY,
      lengthOf(index),
      chars
    )
  }

  exact (pattern, min, max) {
    this.add(
      RegExpBuilder.START,
      pattern,
      RegExpBuilder.END
    )
    return typeof min === 'number'
      ? this.withLength(min, max)
      : this
  }

  anyOf () {
    return this
  }

  or () {
    return this
  }
}

function lengthOf (min, max) {
  let pattern = `{${min}`
  if (typeof max === 'undefined') {
    return pattern + '}'
  } else if (max === null) {
    pattern += ','
  } else {
    pattern += 'max'
  }
  return pattern + '}'
}