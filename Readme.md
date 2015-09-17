
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
