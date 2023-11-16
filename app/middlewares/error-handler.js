const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("err");
  console.log(err.message);
  let customError = {
    // set default
    code: err.statusCode || 500,
    message: err.message || "Something went wrong try again later",
  };

  return res.status(customError.code).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
