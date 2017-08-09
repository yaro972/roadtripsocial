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
describe('General server access', () => {
  describe('Home', () => {
    it('should open Home page', (done) => {
      chai.request(server)
        .get('/')
        .end(function(err, res){
          err.should.be.null;
          res.text.should.equal('Home : Not implemented');
        });
      done();
    });

    it('should send page not available', (done) => {
      chai.request(server)
        .get('/not-exist')
        .end(function(err, res){
          err.should.be.null;
          res.should.have.status(404);
          res.text.should.equal('<p><strong>ERROR 404</strong><br /> - la page demandée <strong>"' + req.originalUrl + '"</strong> n\'existe pas</p>');
        });
      done();
    });
  });
});
