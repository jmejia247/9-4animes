const express = require('express');
const animes = require('./controllers/animesController');
const app = express();
const animesController = require('./controllers/animesController');

app.use(express.json()) // parse incoming data
app.use('/animes', animesController);

app.get('/', (req, res) => {
    res.send("Welcome to the best Anime site in the world");
});

app.get('*', (req, res) => {
    res.status(404).json({ error: "Page not found"});
});

module.exports = app;