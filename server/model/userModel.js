const mongoose = require('mongoose');

const userSchmea = new mongoose.Schema({
    firstName :{
        type: String,
        required: true,
    },
    lastName :{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true,
    },
    image:{
        type:String
    }
},{timestamps: true, versionKey: false})

const userModel = mongoose.model('ResEcomUser',userSchmea);

module.exports = userModel;