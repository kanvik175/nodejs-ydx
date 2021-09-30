const router = require('express').Router();
const { uploadImages, listImages, mergeImages } = require('../controllers');

router.post('/upload', uploadImages);
router.get('/list', listImages);
router.get('/merge', mergeImages);

module.exports = router;