const { encrypt } = require("../app/utils/encrypt");
const { generateRandomString } = require("../app/utils/generateRandom");
const prisma = require("../app/utils/prisma");

async function main() {
  const tokopediaUser = await prisma.tokopediaUser.create({
    data: {
      fsId: 1122,
      accessToken: Buffer.from(`${1212}:rahasia123`).toString("base64"),
    },
  });

  encrypt("rahasia123").then((hashedPassword) => {
    const shopeeUser = prisma.shopeeUser.create({
      data: {
        partnerId: 555,
        partnerKey: hashedPassword,
        accessToken: generateRandomString(25),
        refreshToken: generateRandomString(25),
      },
    });

    return shopeeUser;
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
