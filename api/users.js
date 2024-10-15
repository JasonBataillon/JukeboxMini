const express = require('express');
const router = express.Router();
module.exports = router;

const prisma = require('../prisma');

router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
      include: { playlists: true },
    });
    if (user) {
      res.json(user);
    } else {
      next({ status: 404, message: `${id} user does not exist.` });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/:id/playlists', async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return next({
      status: 400,
      message: 'A name AND description must be provided.',
    });
  }

  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: +id,
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
