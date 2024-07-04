const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({path: '.env'});
const PORT = process.env.PORT;
const http = require('http');

app.use(express.json())

const apiRouter = require('./routes/api');
app.use('/api/blog', apiRouter);
app.use('/', (req, res) => {
    res.send('Server is running');
})

const connectDB = async() => {
    try {
        await mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Database is connected')
        })
        .catch((error) => {
            console.error('Database connection error: ', error);
        })
    } catch (error) {
        console.error('Server error ', error);
    }
}

connectDB();

app.listen(PORT, async function() {
    console.log(`Server started in ${PORT} port`);
});

module.exports = app;