const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODOB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})