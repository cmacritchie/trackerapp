const express = require('express')
const Excercise = require('../models/excercise')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/excercise', auth, async (req, res) => {
    const excercise = new Excercise({
        ...req.body,
        owner: req.user._id
    })

    try {
        await excercise.save()
        res.status(201).send(excercise)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/excercise', async (req, res) => {
    try {
        const excercises = await Excercise.find({})
        res.send(excercises)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/excercise/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const excercise = await Excercise.findById(_id)

        if(!excercise) {
            return res.status(404).send()
        }

        res.send(excercise)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/excercise/:id', auth, async (req, res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'duration', 'detail', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const excercise = await Excercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        if(!excercise) {
            return res.status(404).send()
        }

        res.send(excercise)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete

module.exports = router