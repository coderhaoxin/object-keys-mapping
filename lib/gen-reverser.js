
/**
 * @param {Map|Object} dataMap
 */
function genReverser(dataMap) {
  const store = new Map()

  if (dataMap instanceof Map) {
    for (let [key, val] of dataMap.entries()) {
      store.set(key, val)
      store.set(val, key)

      if (typeof key === 'number') {
        store.set(String(key), val)
      }
    }
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
    key = String(key)
    return store.get(key)
  }
}

export default genReverser
