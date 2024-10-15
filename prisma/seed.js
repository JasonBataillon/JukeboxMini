const prisma = require('../prisma');

const seed = async (numUsers = 3, numPlaylists = 5) => {
  for (let i = 0; i < numUsers; i++) {
    const user = await prisma.user.create({
      data: {
        username: `User ${i + 1}`,
      },
    });

    const playlists = Array.from({ length: numPlaylists }, (_, j) => ({
      name: `Playlist# ${j + 1}`,
      description: `#${j + 1} is an interesting playlist!`,
      ownerId: user.id,
    }));
    await prisma.playlist.createMany({
      data: playlists,
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
