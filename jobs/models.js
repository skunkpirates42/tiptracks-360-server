const mongoose = require('mongoose');

// Force mongoose to use JS Promises instead of it's own version of Promises
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema({
  job: { type: String, required: true },
  position: { type: String, default: ''},
  baseWage: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tip' }]
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Job = mongoose.model('Job', schema);

module.exports = { Job };