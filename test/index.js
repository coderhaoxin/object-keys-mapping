'use strict'

const toCamelcase = require('../').toCamelcase
const Operator = require('../').Operator
const equal = require('assert').deepEqual

describe('object-keys-mapping', () => {
  describe('camelcase', () => {
    const origin = {
      a_b: 'a',
      a_c: {
        b_c: 'b',
        b_d: {
          c_d: 'c'
        }
      }
    }

    const expect = {
      aB: 'a',
      aC: {
        bC: 'b',
        bD: {
          cD: 'c'
        }
      }
    }

    it('toCamelcase', () => {
      equal(toCamelcase(origin), expect)
    })

    it('operator.map', () => {
      const operator = new Operator()
      equal(operator.map(origin), expect)
    })
  })

  describe('mapping', () => {
    const origin = {
      a_b: 'a',
      a_c: {
        b_c: 'b',
        b_d: {
          c_d: 'c'
        }
      },
      a_d: [1, 2, 3],
      a_e: [{ title: 'hi' }, { title: 'hi' }, { title: 'hi' }]
    }

    const expect = {
      aB: 'a',
      aC: {
        bC: 'b',
        bD: {
          cD: 'c'
        }
      },
      ad: [1, 2, 3],
      ae: [{ name: 'hi' }, { name: 'hi' }, { name: 'hi' }]
    }

    it('operator.map', () => {
      const operator = new Operator({
        camelcase: true,
        mapping: {
          '.a_d': 'ad',
          '.a_e': 'ae',
          '.a_e.title': 'name'
        }
      })

      equal(operator.map(origin), expect)
    })
  })
})
