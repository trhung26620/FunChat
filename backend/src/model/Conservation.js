const mongoose = require('mongoose')
const conversationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
}, { collection: 'Conversation', timestamps: true })

module.exports = mongoose.model('Conversation', conversationSchema)