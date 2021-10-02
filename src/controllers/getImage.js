const db = require('../entities/Database');
const { createReadStream } = require('fs');
const { NotFoundError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    const { id } = req.params;
    const image = db.findOne(id);

    if (!image) {
      throw new NotFoundError();
    }

    const readStream = createReadStream(image.getFilePathname());

    res.set({ 'Content-Type': 'image/jpeg' });

    readStream.pipe(res);
  } catch(e) {
    next(e);
  }
}