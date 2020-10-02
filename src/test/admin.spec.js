'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

// var assert = require('assert');

//Our parent block
describe('Admin part', () => {

  describe('Home admin page', () => {
    it('Open Home', (done) => {
      chai.request(server)
        .get('/admin')
        .end(function(err, res){
          res.text.should.equal('PAS ENCORE IMPLEMENTE : Administration du site');
          done();
        });
    });
  });
});
