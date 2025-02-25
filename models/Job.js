const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    description: {
        type: String,
        required: [true, "Please provide description"],
    },
    category: {
        type: String
    },
    country: {
        type: String,
        required: [true,"Please provide a country name"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },

    location: {
        type: String,
        require: [true, "Please provide a location name"],
    },
    fixedSalary: {
        type: Number,
    },
    salaryFrom: {
        type: Number,
    },
    salaryTo:{
        type: Number,
    },
    expired: {
        type:Boolean,
        default: false,
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

const JobModel = mongoose.model("Job",JobSchema);
module.exports = JobModel