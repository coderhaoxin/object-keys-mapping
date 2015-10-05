
const isArray = Array.isArray

/**
 * @param {Object} origin
 */
function pick(origin, ...keys) {
  let result = {}

  for (let key of keys) {
    let pickTo

    if (isArray(key)) {
      pickTo = key[1] || key[0]
      key = key[0]
    } else {
      pickTo = key
    }

    if (origin.hasOwnProperty(key)) {
      result[pickTo] = origin[key]
    }
  }

  return result
}

export default pick
