
'use strict'

import { deepEqual as equal } from 'assert'

import {
  reverseCamelcase,
  toCamelcase,
  Operator
} from '../lib'

describe('index', () => {
  describe('camelcase', () => {
    const origin = {
      aa_bb_C01: 'a',
      aa_bb_c01: 'a',
      aa_bb_01: 'a',
      AA_BB_01: 'a',
      a_b_01: 'a',
      A_B_01: 'a',
      a_b: 'a',
      a_c: {
        b_c: 'b',
        b_d: {
          c_d: 'c'
        }
      }
    }

    const expect = {
      aaBbC01: 'a',
      aaBbC01: 'a',
      aaBb01: 'a',
      aaBb01: 'a',
      aB01: 'a',
      aB01: 'a',
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

  describe('reverse camelcase', () => {
    const origin = {
      a_a: 'a',
      aB: 'a',
      aC: {
        bC: 'b',
        bD: {
          cD: 'c'
        }
      }
    }

    const expect = {
      a_a: 'a',
      a_b: 'a',
      a_c: {
        b_c: 'b',
        b_d: {
          c_d: 'c'
        }
      }
    }

    it('reverseCamelcase', () => {
      equal(reverseCamelcase(origin), expect)
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

  describe('edge cases', () => {
    const operator = new Operator({
      camelcase: true
    })

    it('property is null', () => {
      equal(operator.map({
        is_null: null
      }), {
        isNull: null
      })
    })

    it('property is undefined', () => {
      equal(operator.map({
        is_undefined: undefined
      }), {
        isUndefined: undefined
      })
    })
  })
})
