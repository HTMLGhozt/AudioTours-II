const mongoose = require('mongoose');
const { expect } = require('chai');
const User = require('../api/models/userSchema.js');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/27017', { useMongoClient: true });

describe('User Schema', () => {
  const myUser = {
    username: 'IvanMora',
    password: 'I_Also_Program_In_ArnoldC',
  };
  let testUser;
  beforeEach((done) => {
    const newUser = User(myUser);

    newUser
      .save()
      .then((nUser) => { testUser = nUser.toObject(); done(); })
      .catch((err) => { console.error(err); });
  });
  afterEach((done) => {
    User.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });
  it('should error if the username is empty', () => {
    const failingUser = new User();
    failingUser.validate((err) => {
      const errorMessage = err.errors.username.message;
      expect(errorMessage).to.equal('Path `username` is required.');
    });
  });
  it('should properly set username', () => {
    expect(testUser.username).to.equal(myUser.username);
  });
  it('should have timestamps - created_at and updated_at - as dates', () => {
    expect(testUser).to.have.ownProperty('created_at');
    expect(testUser).to.have.ownProperty('updated_at');
    expect(testUser.created_at).to.be.an.instanceof(Date);
    expect(testUser.updated_at).to.be.an.instanceof(Date);
  });
  it('should have `_creator` set do false as default', () => {
    expect(testUser).to.have.ownProperty('_creator', false);
  });
  it('should have `createdTours` and `purchasedTours` as arrays' /* of tour objects */, () => {
    expect(testUser).to.have.ownProperty('createdTours');
    expect(testUser).to.have.ownProperty('purchasedTours');
    expect(Array.isArray(testUser.createdTours)).to.equal(true);
    expect(Array.isArray(testUser.purchasedTours)).to.equal(true);
  });
  it('should properly update `updated_at`', () => {
    User
      .findByIdAndUpdate(testUser._id, { _creator: true }, { new: true })
      .then((uUser) => {
        /* Debugging
         * console.info('updated: ', uUser.updated_at);
         * console.info('testUser updated: ', testUser.updated_at);
         * console.info('created: ', uUser.created_at);
         */
        expect(uUser.updated_at).to.not.equal(uUser.created_at);
      })
      .catch(err => console.error(err));
  });
});
