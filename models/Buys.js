  
const mongoose = require ('mongoose')
const moment = require('moment-timezone');
const dateArgentina = moment().tz("America/Argentina/Buenos_Aires").format();



const buySchema = new mongoose.Schema({
        products:[{type:Object, required:true}],
        userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true},
        date: {type: String, default: dateArgentina},
        deliverInformation:[{type:Object , required:true}],
        totalPrice:{type:Number, required: true},
})

const Buy = mongoose.model ('buy', buySchema )

module.exports = Buy