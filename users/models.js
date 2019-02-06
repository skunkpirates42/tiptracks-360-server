const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Force mongoose to use JS Promises instead of it's own version of Promises
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: { type: String, default: ''},
  dailyReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyReport' }]
});

UserSchema.methods.serialize = function () {
  return {
    username: this.username || '',
    fullName: this.fullName || '',
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

UserSchema.set('timestamps', true);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };