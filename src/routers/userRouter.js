const express = require('express')
const User = require('../models/user')
const Sleep = require('../models/sleep')
const Programming = require('../models/programming')
const Weight = require('../models/weight')
const Exercise = require('../models/exercise')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})      
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/api/users/logout', auth, async (req, res) => {
    try{
        
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens =[]
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//bypass for now
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users) 
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/api/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/api/users/guest', async (req, res) => {
    try{
        const user = await User.findOne({ name:'Craig MacRitchie' }) 

        if(!user) {
            res.status(404).send({error: "guest user not Found!"})
        }
        const guestUser ={ 
            _id: user._id,
            name:"guest"
        }
        res.send(guestUser)
    } catch (e) {
        res.status(500).send()
    }
    
})

router.patch('/api/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'birthdate']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid operation'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//add to postman
router.delete('/api/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/users/guest/recent', async(req, res) => {
    try{
        const craig = await User.findOne({ email:'craig.macritchie@gmail.com' }) 
        const [sleep, exercise, weight, programming] = await Promise.all([
            await Sleep.findOne({owner:craig._id}).sort({updatedAt: -1}),
            await Exercise.findOne({owner:craig._id}).sort({updatedAt: -1}),
            await Weight.findOne({owner:craig._id}).sort({updatedAt: -1}),
            await Programming.findOne({owner:craig._id}).sort({updatedAt: -1})
        ])
        
        res.send({
            ...sleep !== null && { sleep }, 
            ...exercise !== null && { exercise }, 
            ...weight !== null && { weight }, 
            ...programming != null && { programming }
        })       
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/users/me/recent', auth, async(req, res) => {
    try{
        const [sleep, exercise, weight, programming] = await Promise.all([
            await Sleep.findOne({owner:req.user._id}).sort({updatedAt: -1}),
            await Exercise.findOne({owner:req.user._id}).sort({updatedAt: -1}),
            await Weight.findOne({owner:req.user._id}).sort({updatedAt: -1}),
            await Programming.findOne({owner:req.user._id}).sort({updatedAt: -1})
        ])

        res.send({
            ...sleep !== null && { sleep }, 
            ...exercise !== null && { exercise }, 
            ...weight !== null && { weight }, 
            ...programming != null && { programming }
        })
        
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router