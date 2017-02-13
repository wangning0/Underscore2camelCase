## underscore2camelCase
> 下划线命名法和驼峰式命名法相互转化

##Usage
### 转换字符串
```
underscore2camelCase.camelize('hello_world') // 'helloWorld'
underscore2camelCase.decamelize('fooBar') // 'foo_bar'
underscore2camelCase.decamelize('fooBarBaz', { separator: '-' }) // 'foo-bar-baz'
```
### 转换Object keys
```
var object = { attr_one: 'foo', attr_two: 'bar' }
underscore2camelCase.camelizeKeys(object); // { attrOne: 'foo', attrTwo: 'bar' }
```

```
var array = [{ attr_one: 'foo' }, { attr_one: 'bar' }]
underscore2camelCase.camelizeKeys(array); // [{ attrOne: 'foo' }, { attrOne: 'bar' }]
```




