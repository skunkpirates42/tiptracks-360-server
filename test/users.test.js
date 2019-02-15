const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_DATABASE_URL } = require('../config');

const { User } = require('../users/index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Tip Tracks API - Users', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const fullName = 'Example User';

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return User.createIndexes();
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('POST /api/users', function () {

    it('Should create a new user', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password, fullName })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('username', 'fullName', 'id', 'jobs', 'tips', 'updatedAt', 'createdAt');
          expect(res.body.id).to.exist;
          expect(res.body.username).to.equal(username);
          expect(res.body.fullName).to.equal(fullName);
          return User.findOne({ username });
        })
        .then(user => {
          expect(user).to.exist;
          expect(user.id).to.equal(res.body.id);
          expect(user.fullName).to.equal(fullName);
          return user.validatePassword(password);
        })
        .then(isValid => {
          expect(isValid).to.be.true;
        });
    });

    it('Should reject users with missing username', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ password, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Missing field');
        });
    });

    it('Should reject users with missing password', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Missing field');
        });
    });

    it('Should reject users with non-string username', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username: 1234, password, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Incorrect field type: expected string');
        });
    });

    it('Should reject users with non-string password', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password: 1234, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Incorrect field type: expected string');
        });
    });

    it('Should reject users with non-trimmed username', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username: ` ${username} `, password, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Cannot start or end with whitespace');
        });
    });

    it('Should reject users with non-trimmed password', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password: ` ${password}`, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Cannot start or end with whitespace');
        });
    });

    it('Should reject users with empty username', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username: '', password, fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Must be at least 1 characters long');
        });
    });

    it('Should reject users with password less than 8 characters', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password: 'asdfghj', fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Must be at least 8 characters long');
        });
    });

    it('Should reject users with password greater than 72 characters', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password: new Array(73).fill('a').join(''), fullName })

        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Must be at most 72 characters long');
        });
    });

    it('Should reject users with duplicate username', function () {
      return User
        .create({
          username,
          password,
          fullName
        })
        .then(() => {
          return chai
            .request(app)
            .post('/api/users')
            .send({ username, password, fullName });
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('The username already exists');
        });
    });

    it('Should reject users with duplicate username', function () {
      return User.create({ username, password, fullName })
        .then(() => {
          return chai
            .request(app)
            .post('/api/users')
            .send({ username: 'exampleUser', password, fullName });
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('The username already exists');
        });
    });

    it('Should trim fullname', function () {
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password, fullName: ` ${fullName} ` })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('username', 'fullName', 'id', 'jobs', 'tips', 'updatedAt', 'createdAt');
          expect(res.body.fullName).to.equal(fullName);
          return User.findOne({ username });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.fullName).to.equal(fullName);
        });
    });

  });

});