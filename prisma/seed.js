const prisma = require("../app/utils/prisma");

async function main() {
  const clientId = 1778;
  const clientSecret = "rahasia12345";

  const accessToken = Buffer.from(`${clientId}${clientSecret}`).toString(
    "base64"
  );

  const tokopediaUser = await prisma.tokopediaUser.create({
    data: {
      fsId: 1122,
      accessToken,
    },
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
