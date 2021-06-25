const mongoose = require('mongoose')


const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: [{ type: String, required: true }],
    language: [{ type: String, required: true }],
    developer: { type: String, required: true },
    online: { type: Boolean, required: true },
    platform: [{ type: String, required: true }],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    DLC: [{ name: { type: String}, price: { type: Number }, description: { type: String}, imageBanner:{type:String}, default:0}],
    valoration: [{ good: { type: Boolean}, commentary: { type: String, default: "" }, userId: { type: mongoose.Types.ObjectId, ref: 'user' }}],
    imageBanner: { type: String, required: true },
    imagesBackground: [{ type: String, required: true }],
    PEGI: { type: Number, required: true },
    virtual: { type: Boolean, default: true },

})

const Game = mongoose.model('game', gameSchema)

module.exports = Game