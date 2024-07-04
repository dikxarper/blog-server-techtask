const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({path: '.env'});
const PORT = process.env.PORT;

app.use(express.json())

app.use('/', (req, res) => {
    res.send('Server is running');
})

const apiRouter = require('./routes/api');
app.use('/api/blog', apiRouter);


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

app.listen(PORT, function() {
    console.log(`Server started in ${PORT} port`);
});

module.exports = app;