const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');


module.exports = () => {
  passport.use(new LocalStrategy({
      usernameField: 'email',       // req.body.email ...
      passwordField: 'password',
  }, async (email, password, done) => {
      try {
          const user = await User.findOne({
              where: { email }
          });
          if (!user) {
              return done(null, false, { reason: 'The email does not exist.'});  // Fail to Client Level
          }
          const result = await bcrypt.compare(password, user.password);  // Input password, DB password
          if (result) {                 // Success
              return done(null, user);
          }
          return done(null, false, { reason: 'The password you entered is wrong.' }); // Fail to Client Level
      } catch (error) {
          console.error(error);         // Server Error
          return done(error);
      }
  }));
};