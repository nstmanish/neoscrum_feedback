var express = require('express');
var router = express.Router();

// Include Controller 
const feedController = require('../controllers/feedController');

// Include Middleware
const Auth = require('../middleware/auth');
const Validator = require('../middleware/validator')

/* GET home page. */
router.get ( '/'    ,   Auth,                      feedController.index      );
router.get ( '/feed',   Auth,                      feedController.getFeed    );
router.post( '/feed', [ Auth, Validator('feed') ], feedController.createFeed );

module.exports = router;
