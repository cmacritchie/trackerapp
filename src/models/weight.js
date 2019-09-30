const mongoose = require('mongoose')

const Weight = mongoose.model('Weight', new mongoose.Schema({
    weight: {
        type: Number,
        required: true
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

module.exports = Weight