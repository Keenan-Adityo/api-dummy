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
      return res.status(400).json({
        header: {
          process_time: 0.018328845,
          messages:
            "We could not process your request due to malformed request, please check again",
          reason: "Failed To Initialize Request",
          error_code: "ORD_API_001",
        },
        data: null,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUser,
};
