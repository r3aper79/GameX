const mongoose = require ('mongoose')

const hardwareSchema = new mongoose.Schema({
        productName:{type:String, required:true},
        price:{type:Number, required:true},
        brand:{type:String, required:true},
        description:{type:String, required:true},
        features:[{type:String, required:true,}],
        stock:{type:Number, default:0},
        aditionalGame:[{type: mongoose.Types.ObjectId, ref: 'game'}],
        aditionalProduct:[{type: mongoose.Types.ObjectId, ref: 'hardware'}],
        virtual:{type:Boolean, default:false},
        imageBanner:{type:String, required:true},
        imagesBackground:[{type:String, default:null}],
        
})

const Hardware = mongoose.model ('hardware', hardwareSchema )

module.exports = Hardware