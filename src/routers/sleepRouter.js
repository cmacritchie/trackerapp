const express = require('express')
const Sleep = require('../models/sleep')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/sleep', auth, async (req, res) => {
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

router.get('/sleep', async (req, res) => {
    try {
        const sleep = await Sleep.find({})
        res.send(sleep)
    } catch(e) { 
        res.status(500).send()
    }
})

router.get('/sleep/:id', async (req, res) => {
    const _id = req.params._id

    try {
        const sleep = await Sleep.findById(_id)

        if(!sleep) {
            return res.status(404).send()
        }

        res.send(sleep)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/sleep/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date', 'down', 'up']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        const sleep = await Sleep.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!sleep) {
            return res.status(404).send()
        }
        
        res.send(sleep)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete

module.exports = router