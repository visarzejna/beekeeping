const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config()

require('./models/user')
require('./models/beehive')

require('./services/passport')

const userRoutes = require('./routes/users')
const beehiveRoutes = require('./routes/beehives')

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Db Connected!'))
    .catch(err => console.log(err.message));

const app = express();

app.use(bodyParser.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1/beehive', beehiveRoutes)

app.listen(5000, () => {
    console.log('Server Started on port 5000')
})