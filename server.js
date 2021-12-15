const express = require('express')
const helmet = require("helmet");
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(helmet())
app.use(express.json())
app.use('/api', apiRouter)

const connectMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to database');
      } catch (err) {
        throw new Error(err);
      }
}
connectMongoDb();


// global error handeler
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(err.statusCode || 500).json({
            error: err.message
        })
    } else {
        res.status(500).json({
            error: 'Something Went Wrong'
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})