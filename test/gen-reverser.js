'use strict'

const genReverser = require('../lib').genReverser
const equal = require('assert').deepEqual

describe('genReverser', () => {
  describe('basic', () => {
    it('object', () => {
      const dataSet = {
        '1': 'male',
        '2': 'female',
        'cn': '中文',
        'en': '英文'
      }

      const reverser = genReverser(dataSet)

      equal(reverser(1), 'male')
      equal(reverser('1'), 'male')
      equal(reverser('male'), '1')
      equal(reverser('cn'), '中文')
      equal(reverser('中文'), 'cn')
    })

    it('map', () => {
      const dataSet = new Map()
      dataSet.set(1, 'male')
      dataSet.set(2, 'female')
      dataSet.set('cn', '中文')
      dataSet.set('en', '英文')

      const reverser = genReverser(dataSet)

      equal(reverser(1), 'male')
      equal(reverser('1'), 'male')
      equal(reverser('male'), 1)
      equal(reverser('cn'), '中文')
      equal(reverser('中文'), 'cn')
    })
  })
})
