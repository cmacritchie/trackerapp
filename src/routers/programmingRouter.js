const express = require('express')
const Programming = require('../models/programming')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/programming', auth, async (req, res) => {
    const programming = new Programming({
        ...req.body,
        owner: req.user._id
    })

    try {
        await programming.save()
        res.status(201).send(programming)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/programming', async (req, res) => {
    try {
        const programming = await Programming.find({})
        res.send(programming) 
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/programming/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const programming = await Programming.findById(_id)

        if(!programming) {
            return res.status(404).send()
        }

        res.send(programming)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/programming/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['language', 'duration', 'date', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const programming = await Programming.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!programming) {
            return res.status(404).send()
        }

        res.send(programming)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete

module.exports = router