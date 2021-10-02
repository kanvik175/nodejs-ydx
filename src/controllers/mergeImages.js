const { replaceBackground } = require('backrem');
const { createReadStream } = require('fs');
const db = require('../entities/Database');
const { BadRequestError, NotFoundError } = require('../errors');

const getImageReadStream = (id) => {
  const image = db.findOne(id);

  if (!image) {
    return null;
  }

  const filePathname = image.getFilePathname();
  return createReadStream(filePathname);
}

module.exports = async (req, res, next) => {
  try {
    const { front: frontImageId, back: backImageId, color, threshold } = req.query;

    if (!frontImageId || !backImageId || !color || !threshold) {
      throw new BadRequestError();
    }

    const frontImageReadStream = getImageReadStream(frontImageId);
    const backImageReadStream = getImageReadStream(backImageId);

    if (!frontImageReadStream || !backImageReadStream) {
      throw new NotFoundError();
    }

    const colorArray = color.split(',');

    if (colorArray.length !== 3) {
      throw new BadRequestError();
    }

    const replaceBackgroundStream = 
      await replaceBackground(frontImageReadStream, backImageReadStream, 
        colorArray, threshold)

    res.set({ 'Content-Type': 'image/jpeg' });

    replaceBackgroundStream.pipe(res);
  } catch(e) {
    next(e);
  }
}