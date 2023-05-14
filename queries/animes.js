const db = require('../db/dbConfig');

const getAllAnimes = async () => {
    try {
        const animes = await db.any("SELECT * FROM anime");
        return animes
    } catch (error) {
        return error
    };
};

const getAnAnime = async (id) => {
    try {
        const anime = await db.one("SELECT * FROM anime WHERE id=$1", id)
        return anime  
    } catch (error) {
        return error
    };
};

const createAnAnime = async (anime) => {
    try {
        const animes = await db.any("INSERT INTO anime (name, release) VALUES ($1, $2) RETURNING *", [anime.name, anime.release])
        return animes
    } catch (error) {
        return error
    }
}

const updateAnAnime = async (id, anime) => {
    try {
        const updatedAnime = await db.one("UPDATE anime SET name=$2, release=$3 WHERE id=$1 RETURNING *", [id, anime.name, anime.release])
        return updatedAnime
    } catch (error) {
        return error
    }
}

const deleteAnAnime = async (id) => {
    try {
        const deleted = await db.one("DELETE FROM anime WHERE id=$1 RETURNING *", id)
        return deleted
    } catch (error) {
        return error
    }
}




module.exports = {
    getAllAnimes,
    getAnAnime,
    createAnAnime,
    updateAnAnime,
    deleteAnAnime
};