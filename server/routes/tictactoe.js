const { Server } = require('socket.io');
const { Game } = require('../models');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected from socket:', socket.id);

        socket.on('userInTictack', async (data) => {
            try {
                const { id, name } = data;
                
                const game = await Game.findByPk(id);
                if (!game) {
                    socket.emit('gameError', { error: 'Game not found' });
                } else {
                    let userRole = null;

                    if (game.player1 === name) {
                        userRole = 'Х';
                    } else if (game.player2 === name) {
                        userRole = 'O';
                    }
        
                    if (userRole) {
                        socket.emit('userRole', { role: userRole });
                    } else {
                        socket.emit('gameError', { error: 'Player not found in the game' });
                    }
                    
                }
            } catch (error) {
                console.error(error);
                socket.emit('gameError', { message: 'An error occurred' });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from socket:', socket.id);
        });
    });
};
