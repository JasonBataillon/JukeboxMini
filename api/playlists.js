const express = require('express');
const router = express.Router();
module.exports = router;

const prisma = require('../prisma');

router.get('/', async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: +id },
    });
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send(`${id} playlist does not exist.`);
    }
  } catch (e) {
    next(e);
  }
});

router.post('/:id/playlists', async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});
