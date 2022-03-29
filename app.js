const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

//middleware
app.use(express.json());




//routes
app.get('/hello',(req,res)=>{
    res.status(200).send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);




const port = 8080;

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}...`);
});