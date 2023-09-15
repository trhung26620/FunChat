require('dotenv').config()
import express from 'express'
import configExpressServer from './config/express-server'
import { parsingResponse, corsProcessing } from './middleware/common'
import unauthenAPI from './route/unauthenAPI'
import authenAPI from './route/authenAPI'
import connectMongoDB from './config/mongo-connection'
import { initializeSocket } from './service/socket'
const path = require('path')
const app = express()
// const http = require('http').Server(app);
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: process.env.URL_REACT,
    },
});

app.set('io', io);
initializeSocket(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// app.listen(PORT, (error) => {
//     if (error) {
//         console.log(`Error occurred, server can't start`, error)
//     } else {
//         console.log(`Listening on port ${PORT}`)
//     }
// });


connectMongoDB()

app.use(express.static(path.join(__dirname, 'public')))
configExpressServer(app)
parsingResponse(app)


// app.post('/messages', async (req, res) => {
//     try {
// io.on('connection', () => {
//     console.log('a user is connected')
// })
//         var data = req.body;
//         let messageSaved = await db.Message.create({
//             name: data.name,
//             message: data.message
//         })
//         io.emit('message', req.body);
//         res.sendStatus(200);
//     }
//     catch (error) {
//         res.sendStatus(500);
//         return console.log('error', error);
//     }
//     finally {
//         console.log('Message Posted')
//     }

// })

corsProcessing(app)
unauthenAPI(app)
authenAPI(app)
