const express = require('express');
const animes = express.Router();
const animesArray = require('../models/animes')

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




// curl -H "Content-Type: application/json" -X POST -d '{"title": "One Piece"}' localhost:8888/animes
