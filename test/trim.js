'use strict'

const equal = require('assert').deepEqual
const trim = require('../').trim

describe('trim', () => {
  describe('basic', () => {
    it('object', () => {
      const origin = {
        a: 'a',
        b: {
          c: 0,
          d: {
            e: ''
          }
        }
      }

      const expect = {
        a: 'a',
        b: {
          c: 0
        }
      }

      equal(trim(origin), expect)
    })

    it('array', () => {
      const origin = {
        a: 'hi',
        b: [1, undefined, null],
        c: [{ name: 'hi' }, { name: '' }, { name: undefined }, { name: undefined, info: 'ok' }],
        d: [[{ name: null }], [{ name: 'hi' }]]
      }

      const expect = {
        a: 'hi',
        b: [1],
        c: [{ name: 'hi' }, { info: 'ok' }],
        d: [[{ name: 'hi' }]]
      }

      equal(trim(origin), expect)
    })
  })
})
