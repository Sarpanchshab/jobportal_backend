const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        Required: true
    },
    email:{
        type: String,
        Required: true
    },
    phone:{
        type: Number,
        Required: true
    },
    password:{
        type: String,
        Required: true
    },
    confirmpassword:{
        type: Number,
        Required: true
    },
    role:{
        type:String,
        Required: true
    },
},{timestamps:true})

const UserModel = mongoose.model('user',UserSchema)
module.exports = UserModel