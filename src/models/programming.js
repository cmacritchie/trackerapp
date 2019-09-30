const mongoose = require('mongoose')

const Programming = mongoose.model('Programming', new mongoose.Schema({
    framework: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false,
        trim: true
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

module.exports = Programming