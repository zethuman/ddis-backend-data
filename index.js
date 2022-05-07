var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const images = require('./routes/images');
const identity = require('./routes/identity');
const { initOrbit } = require('./services/orbitdb');
const { initIPFS } = require('./services/ipfs');

async function initAll() {
    await initIPFS()
    await initOrbit()
}

initAll()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', images);
app.use('/identity', identity);

const PORT = process.env.PORT ?? 4010

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})