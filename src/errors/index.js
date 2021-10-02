class ApiError extends Error {
  constructor(message = 'Internal Server Error', status = 500) {
    super();

    this.message = message;
    this.status = status;
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
}