const express = require('express');
const animes = express.Router();
const { getAllAnimes, getAnAnime, createAnAnime, updateAnAnime, deleteAnAnime } = require('../queries/animes')
// const animesArray = require('../models/animes')



// index
animes.get("/", async (req, res) => {
    const allAnimes = await getAllAnimes();
    // console.log(allAnimes);
    if (allAnimes) {
        res.json({success: true, payload: allAnimes})
    } else {
        res.status(404).json({success: false, message: "Something went wrong"})
    }
});

// individual show
animes.get("/:id", async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params
    const anime = await getAnAnime(id);
    if (anime) {
        res.status(200).json({success: true, payload: anime})
    } else {
        res.status(404).send(`No such anime with id of ${id}`);        
    }
});

// create
animes.post("/new", async (req, res) => {
    const newAnime = req.body;
    const newAnimes = await createAnAnime(newAnime)
    res.status(200).json({success: true, payload: newAnimes})
});

// update 
animes.put('/:id', async (req, res) => {
    const { id } = req.params
    const updatedAnime = req.body

    if (updatedAnime) {
        const updated = await updateAnAnime(id, updatedAnime)
        res.status(200).json({success: true, payload: updated})
    } else {
        res.status(404).json({ success: false, error: `There was no anime with the id of ${id}`})
    }
})

// delete 
animes.delete('/:id', async(req, res) => {
    const { id } = req.params
    
    if (id) {
        const deletedAnime = await deleteAnAnime(id)
        res.status(202).json({ success: true, payload: deletedAnime})
    } else {
        res.status(404).json({ success: false, error: `There was no anime with the id of ${id}`})
    }
})

module.exports = animes;
