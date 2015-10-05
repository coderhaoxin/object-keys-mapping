'use strict'

const equal = require('assert').deepEqual
const pick = require('../').pick

describe('pick', () => {
  describe('basic', () => {
    it('pick keys', () => {
      const origin = {
        a: 'a',
        b: 'b',
        c: undefined
      }

      const expect = {
        a: 'a',
        c: undefined
      }

      equal(pick(origin, 'a', 'c'), expect)
    })

    it('pick keys to ...', () => {
      const origin = {
        a: 'a',
        b: 'b',
        c: undefined
      }

      const expect = {
        A: 'a',
        C: undefined
      }

      equal(pick(origin, ['a', 'A'], ['c', 'C']), expect)
    })
  })
})
