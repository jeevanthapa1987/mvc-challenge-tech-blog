const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const homeController = require('../controllers/homeController'); // Correctly reference the homeController

// Homepage route
router.get('/', homeController.showHomepage);


// Individual post route
router.get('/posts/:id', homeController.showPost);

module.exports = router;
