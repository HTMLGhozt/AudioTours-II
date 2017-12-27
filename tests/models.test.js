const mongoose = require('mongoose');
const { expect } = require('chai');
const User = require('../api/models/userSchema.js');
const Tour = require('../api/models/tourSchema.js');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017', { useMongoClient: true });

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
        // Debugging
        console.info('updated: ', uUser.updated_at);
        console.info('testUser updated: ', testUser.updated_at);
        console.info('created: ', uUser.created_at);

        expect(uUser.updated_at).to.not.equal(uUser.created_at);
      })
      .catch(err => console.error(err));
  });
});

describe('Test Schema', () => {
  let testUser;
  let testTour;
  before((done) => {
    const myUser = {
      username: 'RHamblin',
      password: 'NyanCatIsVomitingRainbows',
    };
    const newUser = new User(myUser);

    newUser
      .save()
      .then((nUser) => { testUser = nUser; done(); })
      .catch((err) => { console.error(err); });
  });
  after((done) => {
    User.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });
  beforeEach((done) => {
    const point1 = { name: 'point1', coordinates: [-1.84802, 112.89041].reverse(), audio: 'urlRegex.com' };
    const point2 = { name: 'point2', coordinates: [-49.23198, 135.91103].reverse(), audio: 'apples.com' };
    const point3 = { name: 'point3', coordinates: [6.57941, -178.04746].reverse(), audio: 'dfkjalsfjd.com' };
    const myTour = {
      creator: testUser._id,
      name: 'myNewTour',
      description: 'IsADecentDescription',
      points: [point1, point2, point3],
      start: [point1],
    };
    const newTour = Tour(myTour);

    newTour
      .save()
      .then((nTour) => { testTour = nTour.toObject(); done(); })
      .catch((err) => { console.error(err); });
  });
  afterEach((done) => {
    Tour.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });
  it('should log', () => {
    console.info(testTour);
    console.info(testTour.start[0])
  });
});
