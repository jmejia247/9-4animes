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

// update 
animes.put('/:id', (req, res) => {
    const { id } = req.params
    const updatedAnime = req.body

    if (animesArray[id]) {
        animesArray[id] = updatedAnime
        res.status(200).json({success: true, payload: animesArray[id]})
    } else {
        res.status(404).json({ success: false, error: `There was no anime with the id of ${id}`})
    }
})

// delete 
animes.delete('/:id', (req, res) => {
    const { id } = req.params
    
    if (animesArray[id]) {
        const deletedAnime = animesArray.splice(id, 1)
        res.status(202).json({ success: true, payload: deletedAnime})
    } else {
        res.status(404).json({ success: false, error: `There was no anime with the id of ${id}`})
    }
})

module.exports = animes;
