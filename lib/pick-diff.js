
/**
 * @param {Object} origin
 * @param {Object} update
 */

function pickDiff(origin, update) {
  let result = {}

  Object.keys(update).forEach((key) => {
    if (origin.hasOwnProperty(key) && origin[key] === update[key]) {
      return
    }

    result[key] = update[key]
  })

  return result
}

export default pickDiff
