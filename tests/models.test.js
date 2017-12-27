const mongoose = require('mongoose');
const { expect } = require('chai');
const User = require('../api/models/userSchema.js');
const Tour = require('../api/models/tourSchema.js');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017', { useMongoClient: true });

const userDb = [
  ['IvanWOW', 'MyOtherProgramIs_ArnoldC'],
  ['RyanCat', 'NyanCatVomitsRainbows'],
  ['LambAusten', 'MIT_TeachersLearnAtLambda'],
  ['BenThere', 'DoneThat'],
  ['HomieLuis', 'WhatsNext'],
];

let testDb;

const writeUsersToDb = (done) => {
  const retVal = userDb.map((user) => {
    const username = user[0];
    const password = user[1];
    return new User({ username, password })
      .save((err, nUser) => {
        if (err) console.error(err);
        return nUser;
      });
  });
  Promise.all(retVal)
    .then((val) => {
      testDb = val.map(v => v.toObject());
      done();
    });
};

const clearUsers = (done) => {
  User.remove({}, (err) => {
    if (err) console.error(err);
    done();
  });
};

describe('Model', () => {
  before(writeUsersToDb);
  after(clearUsers);

  describe('user schema', () => {
    it('should error if the username is empty,', () => {
      const failingUser = new User();
      failingUser.validate((err) => {
        const errorMessage = err.errors.username.message;
        expect(errorMessage).to.equal('Path `username` is required.');
      });
    });
    it('should properly set username', () => {
      expect(testDb.every((user, i) =>
        user.username === userDb[i][0])).to.equal(true);
    });
    it('should have timestamps - created_at and updated_at - as dates', () => {
      testDb.forEach((user) => {
        expect(user).to.have.ownProperty('created_at');
        expect(user).to.have.ownProperty('updated_at');
        expect(user.created_at).to.be.an.instanceof(Date);
        expect(user.updated_at).to.be.an.instanceof(Date);
      });
    });
    it('should have `creator` set do false as default', () => {
      testDb.forEach((user) => {
        expect(user).to.have.ownProperty('creator', false);
      });
    });
    it('should properly update `updated_at`', () => {
      User
        .findByIdAndUpdate(testDb[0]._id, { creator: true }, { new: true })
        .then((uUser) => {
          /* // Debugging
          * console.info('updated: ', uUser.updated_at);
          * console.info('testUser updated: ', testUser.updated_at);
          * console.info('created: ', uUser.created_at);
          */
          expect(uUser.updated_at).to.not.equal(uUser.created_at);
        })
        .catch(err => console.error(err));
    });
  });
});

// describe('Tour Schema', () => {
//   let testUser;
//   let testTour;
//   before((done) => {
//     const myUser = {
//       username: 'RHamblin',
//       password: 'NyanCatIsVomitingRainbows',
//     };
//     const newUser = new User(myUser);

//     newUser
//       .save()
//       .then((nUser) => { testUser = nUser; done(); })
//       .catch((err) => { console.error(err); });
//   });
//   after((done) => {
//     User.remove({}, (err) => {
//       if (err) console.error(err);
//       done();
//     });
//   });
//   beforeEach((done) => {
//     const point1 = { name: 'point1', coordinates: [-1.84802, 112.89041].reverse(), audio: 'urlregex.com' };
//     const point2 = { name: 'point2', coordinates: [-49.23198, 135.91103].reverse(), audio: 'https://apples.com' };
//     const point3 = { name: 'point3', coordinates: [6.57941, -178.04746].reverse(), audio: 'dfkjalsfjd.com' };

//     const myTour = {
//       creator: testUser._id,
//       name: 'myNewTour',
//       description: 'IsADecentDescription',
//       points: [point1, point2, point3],
//       start: [point1],
//     };
//     const newTour = Tour(myTour);

//     newTour
//       .save()
//       .then((nTour) => { testTour = nTour.toObject(); done(); })
//       .catch((err) => { console.error(err); });
//   });
//   afterEach((done) => {
//     Tour.remove({}, (err) => {
//       if (err) console.error(err);
//       done();
//     });
//   });
//   it('should log', () => {
//     console.info(testTour);
//     console.info(testTour.start[0]);
//   });
// });
