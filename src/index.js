const express = require('express')
require('./db/mongoose')

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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})