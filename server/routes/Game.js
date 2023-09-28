const express = require('express');
const router = express.Router();
const { Game } = require('../models');

router.get('/games', async (req, res) => {
    const listOfGame = await Game.findAll()
    res.json(listOfGame)
})

router.post('/createGame', async (req, res) => {
    try {
      const { player1, player2, gameType } = req.body;
      const newGame = await Game.create({ player1, player2, gameType, board: '---------' });
      res.json(newGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
});

router.put("/:id", async (req, res) => {
    const gameId = req.params.id;
    const updatedData = req.body;

    const game = await Game.findByPk(gameId);
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    await game.update(updatedData);

    res.json(game)
})

module.exports = router