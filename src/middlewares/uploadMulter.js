const multer = require('multer');
const { staticDir } = require('../config');
const { v4 } = require('uuid');
const { BadRequestError } = require('../errors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, staticDir)
  },
  filename: (req, file, cb) => {
    const imageId = v4();
    req.imageId = imageId;
    req.imageUploadedAt = Date.now();
    cb(null, `${imageId}.jpg`);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    return cb(null, true);
  }
  cb(new BadRequestError());
  return cb(null, false);
}

module.exports = multer({ storage, fileFilter });