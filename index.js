'use strict';

const crypto = require('crypto');
const thunkify = require('thunkify-wrap');
const request = require('request');

/**
 * md5
 * @param {string} s 字符串
 * @return {string} md5后的字符串
 */
exports.md5 = function(s) {
  return crypto.createHash('md5').update(s, 'utf8').digest('hex');
};


/**
 * 随机生成字符串
 * @param {int} length 长度
 * @return {string}
 */
exports.randString = function(length) {
  length = length || 32;
  let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let str = '';
  for (let i = 0; i < length; i++) {
    str += dict[Math.floor(Math.random() * dict.length)];
  }
  return str;
};


/**
 * 提取字符串
 * @param {object} data 提取对象
 * @param {array} fields 提取的字段
 * @param {boolean} notSetNull 字段不存在是否设置成空
 * @return {object}
 */
exports.getFields = function(data, fields, notSetNull) {
  let obj = {};
  for (let i = 0; i < fields.length; i++) {
    if (data[fields[i]] !== undefined) {
      obj[fields[i]] = data[fields[i]];
    }
    else {
      obj[fields[i]] = notSetNull ? undefined : '';
    }
  }

  return obj;
};


/**
 * 下划线命名转换为驼峰命名
 * @param {string} name 转换字符串
 * @return {string} 驼峰命名字符串
 */
exports.toCamel = function(name) {
  let newName = '';
  let underline = false;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === '_' || name[i] === '-') {
      underline = true;
    }
    else {
      newName += underline ? name[i].toUpperCase() : name[i];
      underline = false;
    }
  };
  return newName;
};


/**
 * 获取IP地址
 * @param req 请求头
 * @return ip
 */
exports.getIp = function(req) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  if (ip.match(/\d+\.\d+\.\d+\.\d+/)) {
    ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  }
  else {
    ip = '0.0.0.0';
  }
  return ip;
};


/**
 * 根据IP地址获取IP的关联信息
 * @param req 请求头
 * @return ip
 */
exports.getIpInfo = function(ip) {
  return new Promise(function(resolve, reject) {
    request({
      methos: 'GET',
      url: 'http://ip.taobao.com/service/getIpInfo.php',
      qs: {
        ip: ip
      }
    }, function(err, res, body) {
      if (err) {
        reject(err);
      }
      body = JSON.parse(body);
      resolve(body);
    });
  });
};


/**
 * 格式化日期
 * @param {string} fmt 日期格式字符串，如'yyyyddMMmmHHss'
 * @param {date} d 日期
 * @return ip
 */
exports.dateFormat = function(fmt, d) {
  let date = new Date(d);
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  let week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};


/**
 * thunkify request
 */
exports.request = thunkify(function(options, callback) {
  options.method = options.method || 'GET';
  options.json = true;
  request(options, function(err, req, body) {
    if (err) {
      callback(err, null);
    }
    callback(null, body);
  })
});

