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
      a: 'hi',
      a_b: 'a',
      a_c: {
        b_c: 'b',
        b_d: {
          c_d: 'c'
        }
      },
      a_d: [1, 2, 3],
      a_e: [{ title: 'hi' }, { title: 'hi' }, { title: 'hi' }],
      a_f: [[{ title: 'hi' }], [{ title: 'hi' }]]
    }

    const expect = {
      a: 'hi',
      aB: 'a',
      aC: {
        bC: 'b',
        bD: {
          cD: 'c'
        }
      },
      ad: [1, 2, 3],
      ae: [{ name: 'hi' }, { name: 'hi' }, { name: 'hi' }],
      aF: [[{ name: 'hi' }], [{ name: 'hi' }]]
    }

    it('operator.map', () => {
      const operator = new Operator({
        camelcase: true,
        mapping: {
          '.a_d': 'ad',
          '.a_e': 'ae',
          '.a_e.title': 'name',
          '.a_f.title': 'name'
        }
      })

      equal(operator.map(origin), expect)
    })
  })

  describe('camelcase: false', () => {
    const origin = {
      a_b: 'hi'
    }

    const expect = {
      a_b: 'hi'
    }

    it('operator.map', () => {
      const operator = new Operator({
        camelcase: false
      })

      equal(operator.map(origin), expect)
    })
  })

  describe('invalid origin', () => {
    const operator = new Operator({
      camelcase: true
    })

    it('null', () => {
      equal(operator.map(null), {})
    })

    it(`''`, () => {
      equal(operator.map(''), {})
    })

    it('undefined', () => {
      equal(operator.map(undefined), {})
    })

    it('[]', () => {
      equal(operator.map([]), [])
    })

    it('{}', () => {
      equal(operator.map({}), {})
    })
  })
})
