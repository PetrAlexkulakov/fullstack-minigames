module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        player1: {
          type: DataTypes.STRING,
          allowNull: false
        },
        player2: {
          type: DataTypes.STRING,
          allowNull: true
        },
        board: {
          type: DataTypes.STRING,
          allowNull: false
        }
    });

    return Game;
}