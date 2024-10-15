const prisma = require('../prisma');

const seed = async (numUsers = 3, numPlaylists = 5) => {
  for (let i = 0; i < numUsers; i++) {
    const playlists = Array.from({ length: numPlaylists }, (_, j) => ({
      name: `Person ${i}${j}`,
      description: `${i}${j} is an interesting playlist!`,
    }));

    await prisma.user.create({
      data: {
        username: `User ${i + 1}`,
        playlists: {
          create: playlists,
        },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
