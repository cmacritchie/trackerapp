const express = require('express')
const Exercise = require('../models/exercise')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/exercise', auth, async (req, res) => {
    const exercise = new Exercise({
        ...req.body,
        owner: req.user._id
    })

    try {
        await exercise.save()
        res.status(201).send(exercise)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/exercise/guest', async (req, res) => {
    try {
        const craig = await User.findOne({email:'craig.macritchie@gmail.com'})
        const exercises = await Exercise.find({owner:craig._id})
        res.send(exercises)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/exercise/me', auth, async (req, res) => {
    try {
        const exercises = await Exercise.find({ owner: req.user._id})
        res.send(exercises)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/exercise/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const exercise = await Exercise.findById(_id)

        if(!exercise) {
            return res.status(404).send()
        }

        res.send(exercise)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/exercise/:id', auth, async (req, res)=> {
    delete req.body._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'duration', 'detail', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        if(!exercise) {
            return res.status(404).send()
        }

        res.send(exercise)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete add to postman
router.delete('/api/exercise/:id', auth, async (req, res) => {
    try {
        const exercise = await Exercise.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        
        if(!exercise) {
            res.status(404).send()
        }

        res.send(exercise)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router