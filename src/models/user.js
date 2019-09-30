const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    birthdate: {
        type: Date,
        require: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
 timestamps: true    
})

//Virtuals are document properties that you can get and set but that do not get persisted to MongoDB.
//The getters are useful for formatting or combining fields, while setters are useful for de-composing
// a single value into multiple values for storage.

userSchema.virtual('excercise', {
    ref: 'Excercise',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('programming', {
    ref: 'Programming',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('sleep', {
    ref: 'Sleep',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('weight', {
    ref: 'Weight',
    localField: '_id',
    foreignField: 'owner'
})


// Schema methods make use of 'this' and cannot therefore not be arrow functions
// Instances of Models are documents. Documents have many of their own built-in instance methods. 
// We may also define our own custom document instance methods too.as 

//removes password and tokens
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens 

    return userObject
}

//generates token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//A static function is a member function of a class that can be called even when an object of the class is not initialized
// This is why we can use arrow functions
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    //this is all that you need to compare according to bcrypt
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//     const user = this
//     //delete all linked 
//     //await Task.deleteMany({ owner: user._id })
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User
