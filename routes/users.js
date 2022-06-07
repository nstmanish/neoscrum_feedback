var express = require('express');
var router = express.Router();

// Importing Controller's
const userController = require('../controllers/userController'); 

// Importing middleware
const Validator = require('../middleware/validator');
const Admin     = require('../middleware/admin');

// Multer
const Upload = require('../helper/file').upload;
const Auth   = require('../middleware/auth');

/* GET users listing. */
router.post('/register' , [ Auth,  Upload.single('profile'), Validator('register'), Admin ], userController.register);
router.post('/login'    , Validator('login')                                               , userController.login   );

/** Export */
module.exports = router;
