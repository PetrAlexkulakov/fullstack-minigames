const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())

const db = require('./models')

const gameRouter = require('./routes/Game');
const Game = require('./models/Game');
app.use("/game", gameRouter)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log('Server is running');
    });
}).catch((err) => {
    console.error(err)
})
    