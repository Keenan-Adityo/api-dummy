const bcrypt = require("bcryptjs");

function encrypt(plainText) {
  const encrypted = bcrypt.hash(plainText, 12);

  return encrypted;
}

function compare(plainText, hashedText) {
  const compare = bcrypt.compare(plainText, hashedText);

  return compare;
}

module.exports = { encrypt, compare };
