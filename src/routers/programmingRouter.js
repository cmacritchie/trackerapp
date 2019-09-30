const express = require('express')
const Programming = require('../models/programming')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/programming', auth, async (req, res) => {
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

router.get('/api/programming', async (req, res) => {
    try {
        const programming = await Programming.find({})
        res.send(programming) 
    } catch(e) {
        res.status(500).send()
    }
})

//add to postman
router.get('/api/programming/guest', async (req, res) => {
    try {
        //try and use populate?
        const craig = await User.findOne({email:'craig.macritchie@gmail.com'})
        const programming = await Programming.find({owner:craig._id}) 

        res.send(programming) 
    } catch(e) {
        res.status(500).send()
    }
})

//add to postman
router.get('/api/programming/me', auth, async (req, res) => {
    try {
        const programming = await Programming.find({ owner: req.user._id })
        res.send(programming) 
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/api/programming/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const programming = await Programming.findOne({ _id, owner:req.user._id})

        if(!programming) {
            return res.status(404).send()
        }

        res.send(programming)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/programming/:id', auth, async (req, res) => {
    delete req.body._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['framework', 'duration', 'date', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const programming = await Programming.findOneAndUpdate({_id:req.params.id, owner: req.user._id}, req.body, { new: true, runValidators: true})

        if(!programming) {
            return res.status(404).send()
        }

        res.send(programming)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete add to postman
router.delete('/api/programming/:id', auth, async (req, res) => {
    try {
        const programming = await Programming.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!programming) {
            res.status(404).send()
        }

        res.send(programming)
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/api/programming/distinct', async (req, res) => {
//     console.log('We are in')
//     try {
//         // console.log('router distinct')
//         // const values = await Programming.distinct('framework', function(error, ids) {
//         //     console.log(ids)
//         // })
//         // console.log('values')
//         // res.send(values)

//         res.send({'test':'test'})
//     } catch (e) {
//         console.log('problem')
//         res.status(500).send()
//     }
// })

router.get('/api/programmingdistinct', async (req, res) => {
    try {
        // const programming = await Programming.find({})
        const values = await Programming.distinct('framework')
        res.send(values) 
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router