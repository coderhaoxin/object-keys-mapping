
import { isObject } from './util'

const isArray = Array.isArray

const defaultOpts = {
  camelcase: true,
  mapping: {}
}

class Operator {
  /**
   * @param {Object} opts
   */
  constructor(opts = defaultOpts) {
    this.camelcase = opts.camelcase
    this.mapping = opts.mapping || {}
  }

  /**
   * @param {Object|Array} origin
   */
  map(origin) {
    if (!isObject(origin)) {
      return {}
    }

    if (isArray(origin)) {
      return this.mapArray(origin, '')
    } else {
      return this.mapObject(origin, '')
    }
  }

  /**
   * @param {String} path
   * @return {String}
   */
  mapField(path) {
    if (this.mapping[path]) {
      return this.mapping[path]
    }

    path = path.split('.').pop()

    if (this.camelcase) {
      return path.replace(/[_][a-z]/ig, (s) => {
        return s.slice(1).toUpperCase()
      })
    }

    return path
  }

  /**
   * @param {Object} origin
   * @param {String} path
   * @return {Object}
   */
  mapObject(origin, path) {
    let result = {}

    Object.keys(origin).forEach((key) => {
      const value = origin[key]
      let keyPath = path + '.' + key

      if (isArray(value)) {
        result[this.mapField(keyPath)] = this.mapArray(value, keyPath)
      } else if (isObject(value)) {
        result[this.mapField(keyPath)] = this.mapObject(value, keyPath)
      } else {
        result[this.mapField(keyPath)] = value
      }
    })

    return result
  }

  /**
   * @param {Array} origin
   * @param {String} path
   * @return {Array}
   */
  mapArray(origin, path) {
    let result = []

    origin.forEach((item) => {
      if (isArray(item)) {
        result.push(this.mapArray(item, path))
      } else if (isObject(item)) {
        result.push(this.mapObject(item, path))
      } else {
        result.push(item)
      }
    })

    return result
  }
}

function toCamelcase(origin) {
  return (new Operator).map(origin)
}

export {
  toCamelcase,
  Operator
}
