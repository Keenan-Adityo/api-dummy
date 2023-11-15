const { UnauthenticatedError } = require("../../errors/index");
const prisma = require("../../utils/prisma");

const checkUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid!");
    }

    const userToken = prisma.tokopediaUser.findFirst({
      where: {
        accessToken: token,
      },
    });

    if (!userToken) {
      throw UnauthenticatedError("Authentication invalid!");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUser,
};
