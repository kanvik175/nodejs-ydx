const { ApiError } = require('../errors');

const defaultError = 'Error';

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const { message, status } = err;
    return res.status(status).send(message);
  }

  res.status(defaultError).send(500);

  next();
}