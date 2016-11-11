'use strict';

const util = require('../index');
const expect = require('chai').expect;

describe('Zhike-Util', function() {
  describe('#md5', function() {
    it('should get a string which is hashing with md5', function() {
      let data = util.md5('hello');
      expect(data.length).equal(32);
    })
  });

  describe('#randString', function() {
    it('should get a specified length string', function() {
      let data = util.randString(8);
      expect(data.length).equal(8);
    })
  });

  describe('#getFields', function() {
    it('should get an object which contains the specified keys', function() {
      let data = util.getFields({
        id: 1,
        name: 'hop',
        sex: 'male'
      }, ['name', 'sex']);
      expect(data.name).equal('hop');
      expect(data.sex).equal('male');
    })
  });

  describe('#toCamel', function() {
    it('should convert underlined string to camel ', function() {
      let data = util.toCamel('love_is_love');
      expect(data).equal('loveIsLove');
    })
  });

  describe('#getIp', function() {
    it('should get ip address from the request header', function() {
      let data = util.getIp({
        headers: {
          "x-forwarded-for": '127.0.0.1'
        }
      });
      expect(data).equal('127.0.0.1');
    })
  });

  describe('#dateFormat', function() {
    it('should get a specified format date', function() {
      let data = util.dateFormat('yyyy-dd-MM mm:HH:ss', new Date());
      expect(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(data)).equal(true);
    })
  });
});
