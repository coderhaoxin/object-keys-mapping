
'use strict'

import { deepEqual as equal } from 'assert'
import { pick } from '../lib'

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

    it('pick keys and pick keys to ...', () => {
      const origin = {
        a: 'a',
        b: 'b',
        c: undefined
      }

      const expect = {
        a: 'a',
        bb: 'b',
        c: undefined
      }

      equal(pick(origin, 'a', ['b', 'bb'], 'c'), expect)
    })
  })
})
