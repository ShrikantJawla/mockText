require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./configs/db.config');
const port = process.env.PORT
const authRoute = require('./routes/auth.routes')
const bugCardRoute = require('./routes/bugCard.routes')



const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/auth', authRoute)
app.use('/bug', bugCardRoute)


app.get('/', (req, res) => res.send('hello'));


app.listen(port || 8000, async () => {
    await dbConnect();
    console.log(`listening on http://localhost:${port}`)
});