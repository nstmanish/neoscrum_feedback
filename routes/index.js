var express = require('express');
var router = express.Router();

// Include Controller 
const feedController = require('../controllers/feedController');

// Include Middleware
const auth = require('../middleware/auth');
const Validator = require('../middleware/validator')

/* GET home page. */
router.get ( '/', auth, feedController.index   );
router.get ( '/feed', auth, feedController.getFeed   );
router.post( '/feed', [ auth, Validator('feed') ], feedController.createFeed);

module.exports = router;
