const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');


// Define route for /login
router.get('/login', (req, res) => {
  res.send('This is the login page');
});

// Define route for /signup
router.get('/signup', (req, res) => {
  res.send('This is the signup page');
});

// Define route for /dashboard
router.get('/dashboard', (req, res) => {
  res.send('This is the dashboard page');
});

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;
