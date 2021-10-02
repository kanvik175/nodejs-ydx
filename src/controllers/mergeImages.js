const { replaceBackground } = require('backrem');
const { createReadStream } = require('fs');
const sizeOf = require('image-size');
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

const getImageSize = (id) => {
  const image = db.findOne(id);
  const filePathname = image.getFilePathname();

  return sizeOf(filePathname);
}

module.exports = async (req, res, next) => {
  try {
    const { front: frontImageId, back: backImageId, color, threshold } = req.query;

    if (!frontImageId || !backImageId) {
      throw new BadRequestError();
    }

    const { width: frontImageWidth, height: frontImageHeight } = getImageSize(frontImageId);
    const { width: backImageWidth, height: backImageHeight} = getImageSize(backImageId);

    if (frontImageWidth !== backImageWidth || frontImageHeight !== backImageHeight) {
      throw new BadRequestError();
    }

    const frontImageReadStream = getImageReadStream(frontImageId);
    const backImageReadStream = getImageReadStream(backImageId);

    if (!frontImageReadStream || !backImageReadStream) {
      throw new NotFoundError();
    }

    let colorArray;

    if (color) {
      colorArray = color.split(',');

      if (colorArray.length !== 3) {
        throw new BadRequestError();
      }
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