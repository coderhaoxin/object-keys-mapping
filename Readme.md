
[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

### object-keys-mapping

### Usage

```
import { Operator } from 'object-keys-mapping'

const operator = new Operator({
  camelcase: true,
  mapping: {
    '.title': '.name',
    '.info.nick': 'nickname',
    '.items.title': 'name'
  }
})

const obj = operator.map({
  user_id: 123,
  title: 'hi',
  info: {
    nick: 'cat'
  },
  items: [{
    title: 'dog'
  }]
})

// obj is:

{
  userId: 123,
  name: 'hi',
  info: {
    nickname: 'cat'
  },
  items: [{
    name: 'dog'
  }]
}
```

### License
MIT

[npm-img]: https://img.shields.io/npm/v/object-keys-mapping.svg?style=flat-square
[npm-url]: https://npmjs.org/package/object-keys-mapping
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/onebook/object-keys-mapping.svg?style=flat-square
[david-url]: https://david-dm.org/onebook/object-keys-mapping
