const express = require('express')
const Weight = require('../models/weight')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/weight', auth, async (req, res) => {
    const weight = new Weight({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await weight.save()
        res.status(201).send(weight)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/weight', async (req, res) => {
    try {
        const weights = await Weight.find({})
        res.send(weights)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/api/weight/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const weight = await Weight.findById(_id)

        if(!weight) {
            return res.status(404).send()
        }

        res.send(weight)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/weight/:id', auth, async (req, res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['value', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const weight = await Weight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        if (!weight) {
            return res.status(404).send()
        }

        res.send(weight)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete

module.exports = router