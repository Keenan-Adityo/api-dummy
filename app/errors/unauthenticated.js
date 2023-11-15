const CustomError = require("./custom-error");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthenticated;