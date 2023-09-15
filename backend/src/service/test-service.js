// import db from '../models/index'
// import io from '../server'
// import socketSetup from '../config/socketConfig'
// const io = require('../config/socketConfig')
// const io = require('../config/socketConfig');

// const getUser = async (id) => {
//     let user = await db.User.findOne({
//         where: {
//             id: id
//         }
//     })
//     return user
// }

// const getUserPromises = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (id) {
//                 let user = await db.User.findOne({
//                     where: {
//                         id: id
//                     }
//                 })
//                 resolve(user)
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// const getMessages = async () => {
//     let messages = await db.Message.findAll()
//     return messages
// }

// const saveMessageService = async (data, socketio) => {
//     let messageSaved = await db.Message.create({
//         name: data.name,
//         message: data.message
//     })
//     socketio.emit('message', data);
//     return messageSaved
// }

// module.exports = { getUser: getUser, getUserPromises: getUserPromises, getMessages, saveMessageService }