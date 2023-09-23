const express = require('express');
const http = require('http');
const cors = require("cors")
const socketSetup = require('./routes/socket');

const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors())

const db = require('./models')

const gameRouter = require('./routes/Game');
app.use("/game", gameRouter)

const server = http.createServer(app)

socketSetup(server);

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log('Server is running');
    });
}).catch((err) => {
    console.error(err)
})
    