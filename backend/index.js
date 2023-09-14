const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', router);




const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, dbOptions)
    .then(() => console.log('DB connection established'))
    .catch(err => console.error(err))

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('listening on port ' + port)
})

