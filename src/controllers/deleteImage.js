const db = require('../entities/Database');
const { NotFoundError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    const { id } = req.params;

    const success = db.remove(id);

    if (!success) {
      throw new NotFoundError();
    }

    res.json({ id });
  } catch (e) {
    next(e);
  }
}