'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');

describe('User Model', function() {
  var user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com'
  });

  before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });
});
