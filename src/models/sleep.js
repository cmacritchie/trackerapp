const mongoose = require('mongoose')

const Sleep = mongoose.model('Sleep', new mongoose.Schema({ 
    date: {
        type: Date,
        required: true
    },
    down: {
        type: Number,
        required: true
    },
    up: {
        type: Number,
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

//add virtual for sleep time

module.exports = Sleep