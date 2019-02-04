const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { users } = require('../db/data');
const { JWT_SECRET } = require('../config');

function findRandomUser (users, username) {
  return (users.find(user => user.username === username));
}




const localStrategy = new LocalStrategy((username, password, callback) => {
  const user = findRandomUser(users, username);
  if (!user) {
    return Promise.reject({
      reason: 'LoginError',
      message: 'Incorrect username or password'
    });
  }
  return user.validatePassword(password)
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  }, 
  (payload, done) => {
    done(null, payload.user);
  }
);


module.exports = { localStrategy, jwtStrategy};