var express = require('express');
var router = express.Router();

// Importing Controller's
const userController = require('../controllers/userController'); 

// Multer
const upload = require('../helper/file').upload;
const auth   = require('../middleware/auth');

/* GET users listing. */
router.post('/register' , [auth, upload.single('profile')], userController.register);
router.post('/login'    ,                                   userController.login   );
router.post('/logout'   , auth                            , userController.logout  );

module.exports = router;
