# zhike-util

public function library for zhike

## INSTALL

  npm install zhike-util

## API

+ [md5](#jumpMd5)
+ [randString](#jumpRandString)
+ [getFields](#jumpGetFields)
+ [toCamel](#jumpToCamel)
+ [getIp](#jumpGetIp)
+ [dateFormat](#jumpDateFormat)
+ [request](#jumpRequest)

### md5(s)
<span id='jumpMd5'></span>
Hash a string with md5

Params

+ s(String): string before md5

Usage

```js
var util = require('zhike-util');
util.md5('hello');  // 5d41402abc4b2a76b9719d911017c592
```

### randString(length)
<span id='jumpRandString'></span>
Generate a specified length string randomly

Params

+ length(Number): length of string

Usage

```js
var util = require('zhike-util');
util.randString(8);  // B2UT7Z3E
```

### getFields(data, fields, notSetNull)
<span id='jumpGetFields'></span>
Extract fields which contains by data

Params

+ data(Object): object which is extracted
+ fields(Array): array of keys
+ notSetNull(Boolean, default: false): fields not contained by object should set null or not

Usage

```js
var util = require('zhike-util');
var data = {
  id: 1,
  name: 'fengliner',
  sex: 'male'
};
var fields = ['id', 'name', 'age'];
util.getFields(data, fields);  // {id: 1, name: 'fengliner', age: ''}
util.getFields(data, fields, true);  // {id: 1, name: 'fengliner', age: undefined}
```

### toCamel(name)
<span id='jumpToCamel'></span>
Convert underlined or middlelined string to camel

Params

+ name(String)

Usage

```js
var util = require('zhike-util');
var name = 'love_is-love';
util.toCamel(name);  // loveIsLove
```

### getIp(req)
<span id='jumpGetIp'></span>
Get ip address from the request header

Params

+ req(Object)

Usage

```js
var util = require('zhike-util');
var app = require('express')();
app.use(function(req, res, next) {
  util.getIp(req);  // 127.0.0.1
  next();
})
```

### dateFormat(fmt, d)
<span id='jumpDateFormat'></span>
Format a specified date

Params

+ fmt(String): date format, example: yyyyMMddHHmmss
+ d(date): date

Usage

```js
var util = require('zhike-util');
var date = new Date();
util.dateFormat('yyyyMMddHHmmss', date);  // 20161114105537
util.dateFormat('yyyy-MM-dd HH:mm:ss', date);  // 2016-11-14 10:55:37
```

### request(options, callback)
<span id='jumpRequest'></span>
Thunkify request which could be used by yield directly

Params

+ options(Object): any options supported by request, `method` default `GET` and `json` default `true`

Usage

```js
var util = require('zhike-util');
var co = require('co');
co(function*() {
  yield util.request({
    uri: 'http://api.smartstudy.com/user/count',
    qs: {
      source: 'www.smartstudy.com'
    }
  });
  yield util.request({
    uri: 'http://api.smartstudy.com/user/signup/phone',
    method: 'POST',
    body: {
      phone: 15652398760,
      password: '123456'
    }
  });
})
```

## TEST

  npm run test
