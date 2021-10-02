const router = require('express').Router();
const { uploadImage, listImages, mergeImages } = require('../controllers');
const upload = require('../middlewares/uploadMulter');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/list', listImages);
router.get('/merge', mergeImages);

module.exports = router;