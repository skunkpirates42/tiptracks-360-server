const mongoose = require('mongoose');

// Force mongoose to use JS Promises instead of it's own version of Promises
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
  date: { type: String, required: true },
  baseWage: { type: String, required: true },
  hours: { type: String, required: true },
  notes: { type: String, default: '' },
  tippedOut: { type: String, default: '' },
  totalTips: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobs: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Tip = mongoose.model('Tip', schema);

module.exports = { Tip };