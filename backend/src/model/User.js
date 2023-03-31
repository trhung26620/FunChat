const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    avatarUrl: { type: String, default: null },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: Boolean, default: false },
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    otp: {
        code: {type: String, required: true},
        expiry: {type: Date, required: true}
    },
    otpVerification: {type: Boolean, default: false}
}, { collection: 'User', timestamps: true })

module.exports = mongoose.model('User', userSchema)