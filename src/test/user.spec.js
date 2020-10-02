'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let mongoose = require("mongoose");
let User = require('../app/models/user.model');

describe('User Model', function () {
  let user;
  let id;
  let hashPass;

  describe('Ajout d\'utilisateur', function () {
    beforeEach(function () {
      user = new User({
        "nickname": "FakeUser",
        "password": "pass",
        "email": "jdoe@local.fr",
        // "firstname": "John",
        // "lastname": "Doe",
        // "city": "Paris",
        // "country": "France",

        // "gender": 0
      });
    });

    afterEach(function () {
      User.remove({
        nickname: "FakeUser"
      }, function () {

      });
    });

    it('should add a new user', function () {
      User.addUser(user,
        function (err, hash) {
          expect(err).to.be.null;
          hash.should.be.a('object');


          id = hash._id;
          hashPass = hash.password;
        });
    });

    it('should add Civility to user', function (done) {
      let civility = {
        "firstname": "John",
        "lastname": "Doe",
        "city": "Paris",
        "country": "France",
        "gender": 1
      };
      User.addCivility("FakeUser", civility,
        function (err, hash) {
          done();

          expect(err).to.be.null;
          hash.should.be.a('object');
          hash.ok.should.be.equal(1);
          hash.nModified.should.be.equal(1);
        });
    });


    it('should add extra details profile to user', function (done) {
      let details = {
        "presentation": "Test",
        "visitedCountries": ["France", "Paris"]
      };
      User.addExtraDetails("FakeUser", details,
        function (err, hash) {
          done();

          expect(err).to.be.null;
          hash.should.be.a('object');
          hash.firstname.should.be.equal('John');
          hash.visited.Countries.should.be.a('array');
          hash.ok.should.be.equal(1);
          hash.nModified.should.be.equal(1);
        });
    });
  });

  describe('Utilisateur connecté', function () {
    beforeEach(function (done) {
      user = new User({
        "nickname": "FakeUser",
        "password": "pass",
        "firstname": "John",
        "lastname": "Doe",
        "city": "Paris",
        "country": "France",
        "email": "jdoe@local.fr",
        "gender": 0
      });

      User.addUser(user,
        function (err, hash) {
          done();
          id = hash._id;
        });
    });

    afterEach(function () {
      User.remove({
        nickname: "FakeUser"
      }, function (err) {

      });
    });

    it('should refused add a new user', function (done) {
      delete user.password;

      User.addUser(user,
        function (err, hash) {
          expect(err).to.be.null;
          hash.should.be.a('object');
          done();

          // id = hash._id;
        });
    });

    it('should retrieve a user ById', function (done) {
      User.getUserByNickname("FakeUser", function (err, hash) {
        id = hash.id;
        User.getUserById(id, function (err, hash) {
          expect(err).to.be.null;
          hash.should.be.a('object');
          done();
        });
      });
    });

    it('should retrieve a user Nickname', function (done) {
      User.getUserByNickname("FakeUser", function (err, hash) {
        expect(err).to.be.null;
        hash.should.be.a('object');
        done();
      });
    });
    it('should retrieve a user firstname', function (done) {
      User.getUserByFirstname("John", function (err, hash) {
        expect(err).to.be.null;
        hash.should.be.a('object');
        done();
      });
    });

    it('should retrieve a user lastname', function (done) {
      User.getUserByLastname("Doe", function (err, hash) {
        expect(err).to.be.null;
        hash.should.be.a('object');
        done();
      });
    });

    it('should compare password', function (done) {
      User.comparePassword("pass", hashPass, function (err, hash) {
        expect(err).to.be.null;
        hash.should.be.true;
        done();
      });
    });

    it('should validate email', function (done) {
      User.getUserByMail("jdoe@local.fr", function (err, userElement) {
        expect(err).to.be.null;
        userElement.should.be.a('object');
        done();
      });
    });

    it('Should update its profile', function (done) {
      let newProfile = {
        nickname: "FakeUser",
        firstname: "Do",
        lastname: "Dam",
        gender: "1",
        city: "Madrid",
        country: "Espagne",
        presentation: "Nouvelle presentation",
        visitedCountries: ["France", "Allemagne", "Espagne"],
      };

      User.updateProfile(newProfile, function (err, newUserProfile) {
        done();
        expect(err).to.be.null;
        newUserProfile.firstname.should.be.equal("Dam");
        newUserProfile.lastname.should.be.equal("Do");
      });
    });
  });
});
