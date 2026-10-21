const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        unique:true,
        required:true
    },
});


const url = mongoose.model('url',urlSchema)
module.exports = url