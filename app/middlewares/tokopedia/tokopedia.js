const prisma = require("../../utils/prisma");

const checkUserTokopedia = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid!");
    }

    const userToken = await prisma.tokopediaUser.findFirstOrThrow({
      where: {
        accessToken: token,
      },
    });

    if (!userToken) {
      throw new UnauthenticatedError("Invalid token!");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUserTokopedia,
};
