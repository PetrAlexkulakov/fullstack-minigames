const express = require('express');
const router = express.Router();
const { Game } = require('../models');

router.post('/createGame', async (req, res) => {
    try {
      const { player1, player2 } = req.body;
      const newGame = await Game.create({ player1, player2, board: '---------' });
      res.json(newGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router