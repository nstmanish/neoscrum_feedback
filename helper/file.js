// Importing required Package's
const multer    = require('multer');
const fs        = require('fs');
const path      = require('path');

// Logic To store file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `uploads/profile/`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// Logic for validation of profile
exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" 
          || file.mimetype == "image/jpg" 
              || file.mimetype == "image/jpeg") 
    {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});