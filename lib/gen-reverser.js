
/**
 * @param {Map|Object} dataMap
 * @param {Object} opts
 */

function genReverser(dataMap, opts = {}) {
  const store = new Map()

  const defVal = opts.defaultValue
  const reverseKey = opts.reverseKey
  const key = opts.key

  if (dataMap instanceof Map) {
    for (let [key, val] of dataMap.entries()) {
      store.set(key, val)
      store.set(val, key)
    }
  } else if (Array.isArray(dataMap)) {
    if (!key || !reverseKey) {
      throw new Error('key and reverseKey are required for Array dataMap')
    }

    dataMap.forEach((obj) => {
      store.set(obj[key], obj[reverseKey])
      store.set(obj[reverseKey], obj[key])
    })
  } else {
    Object.keys(dataMap).forEach((key) => {
      store.set(key, dataMap[key])
      store.set(dataMap[key], key)
    })
  }

  /**
   * @param {String|Number} key
   */
  return (key) => {
    return store.get(key) || defVal
  }
}

export default genReverser
