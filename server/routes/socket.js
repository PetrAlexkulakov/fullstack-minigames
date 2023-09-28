const { Server } = require('socket.io');
const { Game } = require('../models');

const tictactoeSocket = require('./tictactoe');

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
                const { player1, player2, gameType } = data;
                const newGame = await Game.create({ player1, player2, gameType, board: '---------', socketId: socket.id });
                
                io.emit('gameCreated', newGame);
            } catch (error) {
                console.error(error);
                socket.emit('gameError', { message: 'An error occurred' });
            }
        });

        socket.on('updateGame', async (data) => {
            const { id, updatedData } = data;
            
            const game = await Game.findByPk(id);
            if (!game) {
                socket.emit('gameError', { error: 'Game not found' });
            } else {
                await game.update(updatedData);
                
                io.emit('gameUpdated', game);
                // socket.emit('gameUpdated', game);
            }
        });

        tictactoeSocket(socket, io);

        socket.on('disconnect', () => {
            console.log('User disconnected from socket:', socket.id);
        });
    });
};
  