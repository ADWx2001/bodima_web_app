const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//connect with mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to mongodb');
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json()); //default middleware

app.get('/', (req, res)=>{ //test case
    res.send("Hi");
})

// create local server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})