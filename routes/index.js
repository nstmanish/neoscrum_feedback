var express = require('express');
var router = express.Router();

// Include Controller 
const feedController = require('../controllers/feedController');

// Include Middleware
const auth = require('../middleware/auth');

/* GET home page. */
router.get ( '/', auth, feedController.index   );
router.get ( '/feed', auth, feedController.getFeed   );
router.post( '/feed', auth, feedController.createFeed);

module.exports = router;
