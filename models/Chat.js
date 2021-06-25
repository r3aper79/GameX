const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    issuer: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    messages: [{ message: { type: String, default: 0 }, ownerUserMessage: { type: mongoose.Types.ObjectId, ref: 'user', required: true } }],
})

const Chat = mongoose.model('chat', chatSchema)

module.exports = Chat