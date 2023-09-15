const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {type: String, required: true},
}, { collection: 'Message', timestamps: true })

module.exports = mongoose.model('Message', messageSchema)