
import { isObject } from './util'

const isArray = Array.isArray
const keys = Object.keys

/**
 * @param {Object|Array} origin
 * @param {Function} ignore
 */
function trim(origin, ignore = defaultIgnore) {
  if (!isObject(origin)) {
    return {}
  }

  if (isArray(origin)) {
    return trimArray(origin, ignore)
  } else {
    return trimObject(origin, ignore)
  }
}

/**
 * @param {Array} origin
 * @param {Function} ignore
 * @return {Array}
 */
function trimArray(origin, ignore) {
  const result = []

  origin.forEach((item) => {
    if (ignore(item)) {
      return
    }

    if (isArray(item)) {
      const arr = trimArray(item, ignore)
      if (arr.length) {
        result.push(arr)
      }
    } else if (isObject(item)) {
      const obj = trimObject(item, ignore)
      if (keys(obj).length) {
        result.push(obj)
      }
    } else {
      result.push(item)
    }
  })

  return result
}

/**
 * @param {Object} origin
 * @param {Function} ignore
 * @return {Object}
 */
function trimObject(origin, ignore) {
  const result = {}

  keys(origin).forEach((key) => {
    const value = origin[key]

    if (ignore(value)) {
      return
    }

    if (isArray(value)) {
      const arr = trimArray(value, ignore)
      if (arr.length) {
        result[key] = arr
      }
    } else if (isObject(value)) {
      const obj = trimObject(value, ignore)
      if (keys(obj).length) {
        result[key] = obj
      }
    } else {
      result[key] = value
    }
  })

  return result
}

function defaultIgnore(v) {
  return v === null || v === undefined || v === ''
}

export default trim
