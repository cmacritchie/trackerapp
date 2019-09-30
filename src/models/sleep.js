const mongoose = require('mongoose')

const sleepSchema = new mongoose.Schema({ 
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
})

sleepSchema.set('toObject', { virtuals: true })
sleepSchema.set('toJSON', { virtuals: true })

sleepSchema.virtual('duration')
.get(function(){
    return (this.up + 24) - this.down;
})

module.exports = mongoose.model ('Sleep', sleepSchema)