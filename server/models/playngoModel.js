const mongoose = require("mongoose");
const Schema = mongoose.Schema

const playngoSchema = new Schema ({
    
    data: {
        type: Object,
        required : true,
    },
    gameName:  {
        type: String,
        required: true,
    },
    gameName1: {
        type : String,
        required: true,
    },
    bet: {
        type: Number,
        required: true,
    },
    winValue: {
        type: Number,
        required: true,
    }

}, {timestamps : true})

module.exports = mongoose.model("Playngo", playngoSchema);