var express = require('express');
var router = express.Router();

// Importing Controller's
const userController = require('../controllers/userController'); 

// Multer
const upload = require('../helper/file').upload;

/* GET users listing. */
router.post('/register', upload.single('profile'), userController.register);
router.post('/login'   , userController.login);

module.exports = router;
