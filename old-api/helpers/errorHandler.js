const errorHandler = (errMessage, status = 422) => {
  const error = new Error(errMessage);
  error.status = status;
  throw error;
};

module.exports = errorHandler;
