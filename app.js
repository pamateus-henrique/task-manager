require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

//middleware
app.use(express.static('./public'));
app.use(express.json());




//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);




const port = 8080;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        });
    } catch (error) {
        console.error(error)
    }
}


start();