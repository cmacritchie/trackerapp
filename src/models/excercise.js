const mongoose = require('mongoose')

//change to date time, set up a virtual

const Excercise = mongoose.model('Excercise', new mongoose.Schema({
    description: {
        type: String,
        required:true
    },
    duration: {
        type: Number,
        required:true
    },
    detail: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
     timestamps: true 
}))

module.exports = Excercise