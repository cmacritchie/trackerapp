const mongoose = require('mongoose')

//change to date time, set up a virtual

const exerciseSchema =  new mongoose.Schema({
    type: {
        type: String,
        required:true
    },
    detail: {
        type: String,
        required: false
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
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
})

exerciseSchema.set('toObject', { virtuals: true })
exerciseSchema.set('toJSON', { virtuals: true })

exerciseSchema.virtual('duration')
.get(function(){
    return this.endTime - this.startTime;
})



module.exports = mongoose.model('Exercise', exerciseSchema)