import fetch_static_config from '../config/static-config'
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatarUrl: { type: String, default: fetch_static_config('DEFAULT_AVATAR_URL') },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: Boolean, default: false },
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: {
        code: { type: String, required: true },
        expiry: { type: Date, required: true }
    },
    otpVerification: { type: Boolean, default: false },
    session: { type: String, default: '' },
    socketId: { type: String },
    lastTimeOnline: { type: Date }
}, { collection: 'User', timestamps: true })

module.exports = mongoose.model('User', userSchema)