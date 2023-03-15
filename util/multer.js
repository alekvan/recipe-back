const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = 'public/images';
    fs.mkdirSync(path, { recursive: true });

    cb(null, path);
  },
  filename: function (req, file, cb) {
    const uniqueTime = new Date().toISOString().replace(/:/g, '-');
    const fileName = `${uniqueTime}-${file.originalname}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
