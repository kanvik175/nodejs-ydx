const router = require('express').Router();
const { getImage, deleteImage } = require('../controllers');

router.get('/:id', getImage);
router.delete('/:id', deleteImage);

module.exports = router;