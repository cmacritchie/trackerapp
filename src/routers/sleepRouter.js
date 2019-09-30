const express = require('express')
const Sleep = require('../models/sleep')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/sleep', auth, async (req, res) => {
    const sleep = new Sleep({
        ...req.body,
        owner: req.user._id
    })

    try { 
        await sleep.save()
        res.status(201).send(sleep)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/api/sleep', async (req, res) => {
//     try {
//         const sleep = await Sleep.find({})
//         res.send(sleep)
//     } catch(e) { 
//         res.status(500).send()
//     }
// })

router.get('/api/sleep/guest', async (req, res) => {

    try {
        const craig = await User.findOne({email:'craig.macritchie@gmail.com'})
        const sleep = await Sleep.find({owner:craig._id})

        res.send(sleep)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/sleep/me', auth, async (req, res) => {

    try {
        const sleep = await Sleep.find({ owner:req.user._id })

        res.send(sleep)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/sleep/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const sleep = await Sleep.findOne({ _id, owner:req.user._id})

        if(!sleep) {
            return res.status(404).send()
        }

        res.send(sleep)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/sleep/:id', auth, async (req, res) => {
    delete req.body._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date', 'down', 'up']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        const sleep = await Sleep.findOneAndUpdate({ _id:req.params.id, owner:req.user._id}, req.body, { new: true, runValidators: true})

        if(!sleep) {
            return res.status(404).send()
        }
        
        res.send(sleep)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete
router.delete('/api/sleep/:id', auth, async (req, res) => {
    try {
        const sleep = await Sleep.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!sleep) {
            res.status(404).send()
        }
        
        res.send(sleep)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router