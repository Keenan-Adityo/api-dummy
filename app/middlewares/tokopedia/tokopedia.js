const { UnauthenticatedError } = require("../../errors");
const prisma = require("../../utils/prisma");

const checkUserTokopedia = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res
        .json({
          header: {
            process_time: 0.018328845,
            messages:
              "We could not process your request due to malformed request, please check again",
            reason: "Failed sending request to upstream",
            error_code: "ORD_API_001",
          },
          data: null,
        })
        .status(400);
    }

    const userToken = await prisma.tokopediaUser.findFirst({
      where: {
        accessToken: token,
      },
    });

    if (!userToken) {
      return res
        .json({
          header: {
            process_time: 0.018328845,
            messages:
              "We could not process your request due to malformed request, please check again",
            reason: "Failed sending request to upstream",
            error_code: "ORD_API_001",
          },
          data: null,
        })
        .status(400);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUserTokopedia,
};
