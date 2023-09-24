const { Server } = require('socket.io');
const { Game } = require('../models');

module.exports = (server) => {
    const io = new Server(server, {
      cors: {
        methods: ["GET", "POST"]
      }
    });
  
    io.on('connection', (socket) => {
        console.log('User connected from socket:', socket.id);

        socket.on('createGame', async (data) => {
            try {
                const { player1, player2 } = data;
                const newGame = await Game.create({ player1, player2, board: '---------', socketId: socket.id });
                
                io.emit('gameCreated', newGame);
            } catch (error) {
                console.error(error);
                socket.emit('gameCreationError', { message: 'An error occurred' });
            }
        });

        socket.on('updateGame', async (data) => {
            const { id, updatedData } = data;
            
            const game = await Game.findByPk(id);
            if (!game) {
                socket.emit('gameUpdateError', { error: 'Game not found' });
            } else {
                await game.update(updatedData);
                
                io.emit('gameUpdated', game);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected from socket:', socket.id);
        });
    });
};
  