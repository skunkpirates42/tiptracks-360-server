const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const { User } = require('../users/index');
const { Tip } = require('../tips/index');
const { Job } = require('../jobs/index');
const { users, tips, jobs } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      User.deleteMany(),
      Tip.deleteMany(),
      Job.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding database...');
    return Promise.all([
      User.insertMany(users),
      Tip.insertMany(tips),
      Job.insertMany(jobs)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });