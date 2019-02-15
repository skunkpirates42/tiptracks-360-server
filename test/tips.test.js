const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../server');
const Tip = require('../tips/index');
const Job = require('../jobs/index');
const User = require('../users/index');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const { tips, jobs, users } = require('../db/data');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Tip Tracks API - Tips', function () {
  let user = {};
  let token;
  before(function () {
    return mongoose.connect(TEST_DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(users),
      Tip.insertMany(tips),
      Job.insertMany(jobs),
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('GET /api/notes', function () {


    it('should return the correct number of tips', function () {
      return Promise.all([
        Tip.find({ userId: user.id}),
        chai.request(app)
          .get('/api/tips')
          .set('Authorization', `Bearer ${token}`)
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
        });
    });
  }); 

});