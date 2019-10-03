const mongoose = require('mongoose')
const moment = require('moment')

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
        type: String,
        required: true
    },
    endTime: {
        type: String,
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

    const startTime = moment(this.startTime, 'h:mm a');
    const endTime = moment(this.endTime, 'h:mm a');
    const mins = endTime.diff(startTime, 'minutes');
    const h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("h:mm ");
})



module.exports = mongoose.model('Exercise', exerciseSchema)