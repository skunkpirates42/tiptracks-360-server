const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const { User } = require('../users/index');
const { DailyReport } = require('../daily-reports/index');
const { users, dailyReports } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      User.deleteMany(),
      DailyReport.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding database...');
    return Promise.all([
      User.insertMany(users),
      DailyReport.insertMany(dailyReports)
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