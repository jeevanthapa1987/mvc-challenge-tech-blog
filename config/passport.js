const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err, null);
  });
});

// Local strategy for user login
passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.'));
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }

    return done(null, user);
  }).catch((err) => {
    return done(err);
  });
}));

// Local strategy for user signup
passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user) {
      return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    } else {
      const newUser = {
        username: username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      };

      User.create(newUser).then((newUser) => {
        return done(null, newUser);
      }).catch((err) => {
        throw err;
      });
    }
  }).catch((err) => {
    return done(err);
  });
}));

module.exports = passport;
