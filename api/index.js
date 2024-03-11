const express = require('express');



const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hi");
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})