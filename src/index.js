const express = require('express')
require('./db/mongoose')
const path = require('path')

const exerciseRouter = require('./routers/exerciseRouter')
const programmingRouter = require('./routers/programmingRouter')
const sleepRouter = require('./routers/sleepRouter')
const userRouter = require('./routers/userRouter')
const weightRouter = require('./routers/weightRouter')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(exerciseRouter)
app.use(programmingRouter)
app.use(sleepRouter)
app.use(userRouter)
app.use(weightRouter)

//serve static assets in porduction
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})