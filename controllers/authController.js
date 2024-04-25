const passport = require('passport');

// Login controller
exports.login = (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

// Signup controller
exports.signup = (req, res, next) => {
  passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  })(req, res, next);
};

// Logout controller
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
