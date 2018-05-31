
export function isObject(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    obj !== null &&
    !(obj instanceof RegExp) &&
    !(obj instanceof Error) &&
    !(obj instanceof Date)
  )
}
