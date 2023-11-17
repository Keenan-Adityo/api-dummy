const prisma = require("../app/utils/prisma");

async function main() {
  const tokopediaUser = await prisma.tokopediaUser.create({
    data: {
      fsId: 1122,
      accessToken: Buffer.from(`${1212}:rahasia123`).toString("base64"),
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