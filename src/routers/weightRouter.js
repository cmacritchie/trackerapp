const express = require('express')
const Weight = require('../models/weight')
const User = require('../models/user')
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

// router.get('/api/weight', async (req, res) => {
//     try {
//         const weights = await Weight.find({})
//         res.send(weights)
//     } catch(e) {
//         res.status(500).send()
//     }
// })

//add to postman
router.get('/api/weight/guest', async (req, res) => {
    try {
        const craig = await User.findOne({email:'craig.macritchie@gmail.com'})
        const weight = await Weight.find({owner:craig._id}).sort({date: 1})

        res.send(weight)
    } catch (e) {
        res.status(500).send()
    }
})

//add to postman
router.get('/api/weight/me', auth, async (req, res) => {
    try {
        const weight = await Weight.find({ owner: req.user._id }).sort({date: 1})
        res.send(weight)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/weight/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const weight = await Weight.findOne({ _id, owner:req.user._id})

        if(!weight) {
            return res.status(404).send()
        }

        res.send(weight)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/weight/:id', auth, async (req, res)=> {
    delete req.body._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['weight', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const weight = await Weight.findOneAndUpdate({ _id:req.params.id, owner:req.user._id}, req.body, { new: true, runValidators: true})
        
        if (!weight) {
            return res.status(404).send()
        }

        res.send(weight)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete add to postman
router.delete('/api/weight/:id', auth, async (req, res) => {
    try {
        const weight = await Weight.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if(!weight){
            res.status(404).send()
        }
        
        res.send(weight)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router