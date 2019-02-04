const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const { User } = require('../users/index');
const { users } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Deleting Data...');
    return User.deleteMany();
  })
  .then(() => {
    console.info('Seeding database...');
    return User.insertMany(users);
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