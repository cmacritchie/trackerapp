const mongoose = require('mongoose')
const moment = require('moment')

const sleepSchema = new mongoose.Schema({ 
    fallAsleepDate: {
        type: Date,
        required: true
    },
    fallAsleepTime: {
        type: String,
        required: true
    },
    wakeUpDate: {
        type: Date,
        required: true
    },
    wakeUpTime: {
        type: String,
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

sleepSchema.virtual('sleepStart')
.get(function(){
    const fallAsleepTime = moment(this.fallAsleepTime, 'h:mm a')

    return moment(this.fallAsleepDate).set({
        'hour':fallAsleepTime.get('hour'),
        'minute':fallAsleepTime.get('minute')
    }).format('dddd, MMMM Do YYYY, h:mm:ss a')
})

sleepSchema.virtual('sleepEnd')
.get(function(){
    const wakeUpTime = moment(this.wakeUpTime, 'h:mm a')

    return moment(this.wakeUpDate).set({
        'hour':wakeUpTime.get('hour'),
        'minute':wakeUpTime.get('minute')
    }).format('dddd, MMMM Do YYYY, h:mm:ss a') 
})

sleepSchema.virtual('duration')
.get(function(){
    const wakeUpTime = moment(this.wakeUpTime, 'h:mm a')

    const wakeDateTime = moment(this.wakeUpDate).set({
        'hour':wakeUpTime.get('hour'),
        'minute':wakeUpTime.get('minute')
    })

    const fallAsleepTime = moment(this.fallAsleepTime, 'h:mm a')

    const sleepDateTime = moment(this.fallAsleepDate).set({
        'hour':fallAsleepTime.get('hour'),
        'minute':fallAsleepTime.get('minute')
    })
    return wakeDateTime.diff(sleepDateTime, 'minutes');
})

module.exports = mongoose.model ('Sleep', sleepSchema)