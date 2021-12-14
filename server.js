const express = require('express')
const helmet = require("helmet");
const cors = require('cors');


const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})