
'use strict'

import { deepEqual as equal } from 'assert'
import { genReverser } from '../lib'

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

      equal(reverser(1), undefined)
      equal(reverser('1'), 'male')
      equal(reverser('male'), '1')
      equal(reverser('cn'), '中文')
      equal(reverser('中文'), 'cn')
    })

    it('object - default value', () => {
      const dataSet = {
        '1': 'male',
        '2': 'female'
      }

      const reverser = genReverser(dataSet, {
        defaultValue: 'male'
      })

      equal(reverser(1), 'male') // default value
      equal(reverser('1'), 'male')
      equal(reverser('?'), 'male') // default value
    })

    it('map', () => {
      const dataSet = new Map()
      dataSet.set(1, 'male')
      dataSet.set(2, 'female')
      dataSet.set('cn', '中文')
      dataSet.set('en', '英文')

      const reverser = genReverser(dataSet)

      equal(reverser(1), 'male')
      equal(reverser('1'), undefined)
      equal(reverser('male'), 1)
      equal(reverser('cn'), '中文')
      equal(reverser('中文'), 'cn')
    })

    it('array - throw error', () => {
      let throwed = false

      try {
        genReverser([])
      } catch (err) {
        equal(err.message, 'key and reverseKey are required for Array dataMap')
        throwed = true
      }

      equal(throwed, true)
    })

    it('array', () => {
      const dataSet = [{
        label: 1,
        value: 'male'
      }, {
        label: 2,
        value: 'female'
      }, {
        label: 'cn',
        value: '中文'
      }, {
        label: 'en',
        value: '英文'
      }]

      const reverser = genReverser(dataSet, {
        key: 'label',
        reverseKey: 'value'
      })

      equal(reverser(1), 'male')
      equal(reverser('male'), 1)
      equal(reverser('cn'), '中文')
      equal(reverser('中文'), 'cn')
    })
  })
})
