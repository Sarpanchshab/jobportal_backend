const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"]
    },
    coverLetter:{
        type:String,
        required:[true, "Please enter your CoverLetter"]
    },
    phone:{
        type: Number,
        required:[true,"Please enter your Number"]
    },
    job:{
        type: String,
        required:[true,"please enter you job name"]
    },
    address:{
        type:String,
        required:[true,"Please enter your Address"]
    },
    resume:{
        public_id:{
            type:String,
            required:[true,]
        },
        url:{
            type:String,
            required:true
        },
    },
    applicationID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            email:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            email:["Employer"],
            required:true
        },
    },
     
})

const ApplicationModel = mongoose.model("Application",ApplicationSchema);
module.exports = ApplicationModel;