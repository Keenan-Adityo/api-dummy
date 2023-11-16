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

    const userToken = await prisma.tokopediaUser.findFirst({
      where: {
        accessToken: token,
      },
    });

    if (!userToken) {
      throw new UnauthenticatedError("Invalid access token!");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUser,
};
