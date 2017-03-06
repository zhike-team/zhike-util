'use strict'

let util = require('./index');

util.getIpInfo('124.207.253.300').then(function(data) {
  console.log(data);
})