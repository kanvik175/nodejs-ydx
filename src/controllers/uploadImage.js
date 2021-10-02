const db = require('../entities/Database');
const Image = require('../entities/Image');

module.exports = (req, res) => {
  const { imageUploadedAt, imageId } = req;
  const { size } = req.file;

  const image = new Image(imageId, imageUploadedAt, size);
  db.insert(image);

  res.json({
    id: imageId
  });
};
