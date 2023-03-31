require('dotenv').config()
import express from 'express'
import configExpressServer from './config/express-server'
import { parsingResponse, corsProcessing } from './middleware/common'
import unauthenAPI from './route/unauthenAPI'
import initSocket from './config/socket-config'
import connectMongoDB from './config/mongo-connection'
const app = express()
const http = require('http').Server(app);

// const http = require("http");
// const server = http.createServer(http);
const io = initSocket(http)
app.set('socketio', io);
// import db from './models/index'

const path = require('path')


const PORT = process.env.PORT || 3000

// app.listen(PORT, (error) => {
//     if (error) {
//         console.log(`Error occurred, server can't start`, error)
//     } else {
//         console.log(`Listening on port ${PORT}`)
//     }
// });
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

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
// testRoute(app)
