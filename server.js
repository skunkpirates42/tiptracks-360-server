require('dotenv').config();
const express = require('express');
const passport = require('passport');

const { router: authRouter, localStrategy, jwtStrategy } = require('./auth/index');

const { PORT } = require('./config');

const app = express();

// Passport/Auth setup
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'go smoke a bong and play some fortnite'
  });
});


app.listen(PORT , () => {
  console.log(`Server is now listening on ${PORT}`);
});