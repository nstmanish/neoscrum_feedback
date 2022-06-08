const express = require('express');
const router = express.Router();

// Include Controller 
const feedController = require('../controllers/feedController');

// Include Middleware
const Auth = require('../middleware/auth');
const Validator = require('../middleware/validator')

/* GET home page. */
router.get ( '/dashboard' ,   Auth,                      feedController.dashboard  );
router.get ( '/feed'      ,   Auth,                      feedController.getFeed    );
router.post( '/feed'      , [ Auth, Validator('feed') ], feedController.createFeed );
router.get ( '/notifyCron',   Auth                     , feedController.notifyCron );

module.exports = router;
