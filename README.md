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
+ [getIPInfo](#jumpGetIPInfo)
+ [dateFormat](#jumpDateFormat)
+ [request](#jumpRequest)

### <a name="jumpMd5"></a> md5(s)
Hash a string with md5

Params

+ s(String): string before md5

Usage

```js
var util = require('zhike-util');
util.md5('hello');  // 5d41402abc4b2a76b9719d911017c592
```

### <a name="jumpRandString"></a> randString(length)
Generate a specified length string randomly

Params

+ length(Number): length of string

Usage

```js
var util = require('zhike-util');
util.randString(8);  // B2UT7Z3E
```

### <a name="jumpGetFields"></a> getFields(data, fields, notSetNull)
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

### <a name="jumpToCamel"></a> toCamel(name)
Convert underlined or middlelined string to camel

Params

+ name(String)

Usage

```js
var util = require('zhike-util');
var name = 'love_is-love';
util.toCamel(name);  // loveIsLove
```

### <a name="jumpGetIp"></a> getIp(req)
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

### <a name="jumpGetLocationFromIP"></a> getIPInfo(ip)
Get location from ip

Params

+ ip(String)

Usage

```js
let util = require('./index');

util.getIpInfo('124.207.253.186').then(function(data) {
  console.log(data);
  // output
  { code: 0,
    data: { 
      country: '中国',
      country_id: 'CN',
      area: '华北',
      area_id: '100000',
      region: '北京市',
      region_id: '110000',
      city: '北京市',
      city_id: '110100',
      county: '',
      county_id: '-1',
      isp: '鹏博士',
      isp_id: '1000143',
      ip: '124.207.253.186' 
    } 
  }
})

util.getIpInfo('124.207.253.300').then(function(data) {
  console.log(data);
  // output
  { code: 1, data: 'invaild ip.' }
})

```

### <a name="jumpDateFormat"></a> dateFormat(fmt, d)
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

### <a name="jumpRequest"></a> request(options, callback)
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
