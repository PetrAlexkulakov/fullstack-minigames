const { Server } = require('socket.io');
const { Game } = require('../models');
const { Op } = require('sequelize');

module.exports = (socket, io) => {
    socket.on('userInTictack', async (data) => {
        try {
            const { id, name } = data;
            
            const game = await Game.findByPk(id);
            if (!game) {
                socket.emit('gameError', { error: 'Game not found' });
            } else {
                let userRole = null;

                if (game.player1 === name) {
                    userRole = 'X';
                } else if (game.player2 === name) {
                    userRole = 'O';
                }
    
                if (userRole) {
                    socket.join(`game-${id}`);
                    socket.emit('userRole', { role: userRole, board: game.board });
                } else {
                    socket.emit('gameError', { error: 'Player not found in the game' });
                }
                
            }
        } catch (error) {
            console.error(error);
            socket.emit('gameError', { message: 'An error occurred' });
        }
    });

    socket.on('playerMove', async (data) => {
        try {
            const { id, name, board } = data;
            
            const game = await Game.findOne({
                where: {
                    id: id,
                    [Op.or]: [{ player1: name }, { player2: name }],//todo
                },
            });

            if (!game) {
                socket.emit('gameError', { message: 'An error occurred' });
            }

            game.board = board; 
            await game.save(); 

            const xIsNext = game.board.split('').filter(char => char === "X").length <= 
                game.board.split('').filter(char => char === "O").length
        
            io.to(`game-${id}`).emit('updateBoard', { board: game.board, xIsNext });

            return game;
        } catch (error) {
            console.error(error);
            socket.emit('gameError', { message: 'An error occurred' });
        }
    })
};
