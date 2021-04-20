export const toRegExp = ({ value, ignoreCase, isExactMatch }) => {
  const source = isExactMatch
    ? `^${value}$`
    : value
  const flags = ignoreCase
    ? 'i'
    : undefined
  return new RegExp(source, flags)
}
