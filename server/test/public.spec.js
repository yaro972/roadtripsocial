'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

let User = require('../app/models/user-model');

// var assert = require('assert');

describe('Public part', function () {
  describe('Users registration', function () {
    beforeEach((done) => { //Before each test we empty the database
      User.remove({
        "nickname": "Test1"
      }, (err) => {
        console.log('Users registration', err);
        done();
      });
    });

    afterEach((done) => { //After each test we empty the database
      User.remove({
        "nickname": "Test1"
      }, (err) => {
        done();
      });
    });
    it('Should POST a new User', function (done) {

      chai.request(server)
        .put('/register')
        .type('form')
        .send({
          "nickname": "Test1",
          "password": "pass",
          "firstname": "Test",
          "lastname": "Mocha",
          "city": "Paris",
          "country": "France",
          "email": "test1@localhost.fr",
          "gender": 0
        })
        .end((err, res) => {
          should.not.exist(err);
          should.not.exist(res.body.err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('succeed');
          res.body.should.have.property('msg');
          done();
        });
    });

    it('Should POST civility to a User', function (done) {
      let civility = JSON.stringify({
        "firstname": "Test",
        "lastname": "Mocha",
        "city": "Paris",
        "country": "France",
        "gender": 0
      });

      chai.request(server)
        .post('/registerCivility')
        .type('form')
        .send({
          "nickname": "Test1",
          "civility": civility

        })
        .end((err, res) => {
          should.not.exist(err);
          should.not.exist(res.body.err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('succeed');
          res.body.should.have.property('msg');
          done();
        });
    });

    it('Should POST extra details to a User', function (done) {
      chai.request(server)
        .post('/registerExtraDetails')
        .type('form')
        .send({
          "nickname": "Test1",
          "extraDetails": JSON.stringify({
            "presentation": "ma presentation",
            "visitedCountries": [
              "France",
              "Allemagne"
            ]
          })
        })
        .end((err, res) => {
          should.not.exist(err);
          should.not.exist(res.body.err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('succeed');
          res.body.should.have.property('msg');
          done();
        });
    });


  });

  describe('Login / Logout operation', function () {
    beforeEach((done) => { //Before each test we empty the database
      chai.request(server)
        .post('/register')
        .type('form')
        .send({
          "nickname": "Test1",
          "password": "pass",
          "firstname": "Test",
          "lastname": "Mocha",
          "city": "Paris",
          "country": "France",
          "email": "test1@localhost.fr",
          "gender": 0
        }).end((err, res) => {
          done();
        });
    });

    afterEach((done) => { //After each test we empty the database
      User.remove({
        "nickname": "Test1"
      }, (err) => {
        done();
      });
    });

    describe('Check nickname validity', function () {
      it('Should accept the nickname', function (done) {
        chai.request(server)
          .post('/nickname-availability')
          .type('form')
          .send({
            "nickname": "Test12"
          })
          .end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('succeed');
            res.body.succeed.should.be.true;
            res.body.available.should.be.true;
            done();
          });
      });
      it('Should refuse the nickname', function (done) {
        chai.request(server)
          .post('/nickname-availability')
          .type('form')
          .send({
            "nickname": "Test1"
          })
          .end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('succeed');
            res.body.succeed.should.be.true;
            res.body.available.should.be.false;
            done();
          });
      });
    });

    describe('User login', function () {
      it('Should accept Login', function (done) {
        chai.request(server)
          .post('/login')
          .type('form')
          .send({
            "nickname": "Test1",
            "password": "pass"
          }).end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('succeed');
            res.body.should.have.property('token');
            res.body.should.have.property('user');
            res.body.succeed.should.be.true;
            done();
          });
      });

      it('Should refused Login', function (done) {
        chai.request(server)
          .post('/login')
          .type('form')
          .send({
            "nickname": "Test1",
            "password": "pass1"
          }).end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('succeed');
            res.body.should.not.have.property('token');
            res.body.should.not.have.property('user');
            res.body.succeed.should.be.false;
            done();
          });
      });

      xit('should retreive a user account by its mail address', function (done) {
        chai.request(server)
          .post('/user-by-mail')
          .type('form')
          .send({
            "email": "test1@localhost.fr"
          }).end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.succeed.should.be.true;
            done();
          });
      });

      xit('should not retreive a user account by its mail address', function (done) {
        chai.request(server)
          .post('/user-by-mail')
          .type('form')
          .send({
            "email": "jdoe1@local.fr"
          }).end((err, res) => {
            should.not.exist(err);
            should.not.exist(res.body.err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.succeed.should.be.false;
            done();
          });
      });
    });

    xit('Should update user profile', function (done) {

      var NewProfile = {
        "newProfile": {
          "nickname": "Test1",
          "firstname": "Do",
          "lastname": "Dam",
          "gender": 1,
          "city": "Madrid",
          "country": "Espagne",
          "presentation": "Nouvelle presentation",
          "visitedCountries": ["France", "Allemagne", "Espagne"]
        }
      };

      chai.request(server)
        .post('/update-profile')
        .type('form')
        .set('Content-Type', 'application/json')
        .send(
          NewProfile

        )
        .end((err, res) => {
          console.log(err);
          should.not.exist(err);
          should.not.exist(res.body.err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.succeed.should.be.true;
          done();
        });
    });
  });
});