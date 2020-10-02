'use strict';

const chai = require('chai');
let expect = chai.expect;

const config = require('../app/inc/.config');

describe('Configuration file', function () {
  describe('Connection Db string', function () {
    it('Should return a complete db string connection', function () {
      config.db.user = 'mydbUser';
      config.db.address = 'my.server.address';
      config.db.dbName = 'dbTesting';
      config.db.pass = 'pass';
      config.db.port = 53682;


      let connectionDb = config.db.connString();
      expect(connectionDb).to.equal('mongodb://mydbUser:pass@my.server.address:53682/dbTesting');
    });

    it('Should return a short db string connection', function () {
      config.db.user = '';
      config.db.address = 'my.server.address';
      config.db.dbName = 'dbTesting';
      config.db.pass = 'pass';
      config.db.port = 53682;


      let connectionDb = config.db.connString();
      expect(connectionDb).to.equal('mongodb://my.server.address:53682/dbTesting');
    });
  });
});