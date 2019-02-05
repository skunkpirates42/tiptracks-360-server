const mongoose = require('mongoose');

// Force mongoose to use JS Promises instead of it's own version of Promises
mongoose.Promise = global.Promise;

const schema = mongoose.Schema({
  baseWage: { type: String, required: true },
  hours: { type: String, required: true },
  notes: { type: String, default: ''},
  tippedOut: { type: String, default: ''},
  totalTips: { type: String, required: true }
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const DailyReport = mongoose.model('DailyReport', schema);

module.exports = { DailyReport };