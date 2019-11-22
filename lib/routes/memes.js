const { Router } = require('express');
const Meme = require('../model/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { top, bottom, image } = req.body;
    Meme
      .create({ top, bottom, image, user: req.user._id })
      .then(meme => {
        res.send(meme);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme
      .find({ user: req.user._id })
      .then(memes => res.send(memes))
      .catch(next);
  });
