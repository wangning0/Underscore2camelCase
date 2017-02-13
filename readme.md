## Underscore2camelCase
> 下划线命名法和驼峰式命名法相互转化

##Usage
### 转换字符串
```
Underscore2camelCase.camelize('hello_world') // 'helloWorld'
Underscore2camelCase.decamelize('fooBar') // 'foo_bar'
Underscore2camelCase.decamelize('fooBarBaz', { separator: '-' }) // 'foo-bar-baz'
```
### 转换Object keys
```
var object = { attr_one: 'foo', attr_two: 'bar' }
Underscore2camelCase.camelizeKeys(object); // { attrOne: 'foo', attrTwo: 'bar' }
```

```
var array = [{ attr_one: 'foo' }, { attr_one: 'bar' }]
Underscore2camelCase.camelizeKeys(array); // [{ attrOne: 'foo' }, { attrOne: 'bar' }]
```




