const express = require('express');
const animes = express.Router();
const animesArray = require('../models/animes')

// validation
const validateURL = (req, res, next) => {
    if (
        req.body.url.substring(0, 7) === "http://" ||
        req.body.url.substring(0, 8) === "https://"
      ) {
        return next();
      } else {
        res
          .status(400)
          .send(`Oops, you forgot to start your url with http:// or https://`);
      }
}

// index
animes.get('/', (req, res) => {
    res.status(202).json({success: true, payload: animesArray})
})

// individual show
animes.get('/:id', (req, res) => {
    const { id } = req.params
    const anime = animesArray[id]
    if (anime) {
        res.status(202).json({success: true, payload: animesArray[id]})
    } else {
        res.status(404).send(`The anime you requested is not hosted on our site at this time! sorry for that. <a href="/animes">please browse our other animes!</a>`)
    }
})

// create
animes.post('/', (req, res) => {
    const newAnime = req.body
    animesArray.push(newAnime)
    res.status(202).json({success: true, payload: animesArray})
})

module.exports = animes;
