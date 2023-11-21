const prisma = require("../../utils/prisma");

const checkUserShopee = async (req, res, next) => {
  try {
    const { access_token, partner_id, timestamp, sign } = req.query;

    if (!access_token) {
      return res
        .json({
          error: "error_param",
          message: "There is no access_token in query.",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    if (!partner_id) {
      return res
        .json({
          error: "error_param",
          message: "There is no partner_id in query.",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    if (!timestamp) {
      return res
        .json({
          error: "error_param",
          message: "no timestamp",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    if (!sign) {
      return res
        .json({
          error: "error_param",
          message: "There is no sign in query.",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    const user = await prisma.shopeeUser.findFirstOrThrow({
      where: {
        accessToken: access_token,
      },
    });

    if (!user) {
      return res
        .json({
          error: "error_auth",
          message: "Invalid access_token.",
          request_id: "2ca3ed1fe1fab0d1e12e5e1efa90e4ac",
        })
        .status(400);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkUserShopee,
};
