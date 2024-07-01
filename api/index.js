import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
//routes
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();
const app = express();
app.use(express.json()); //default middleware for use json objects in server
app.use(cookieParser());
app.get('/', (req, res)=>{ //test case
    res.send("Hi");
})

// create local server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
})

//connect with mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to mongodb');
}).catch((err)=>{
    console.log(err);
})


//routes usage
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const message = err.message || 'Internal Server Error!';
    return res.status(errorStatus).json({
        success:false,
        errorStatus,
        message,
    });
});