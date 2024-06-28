import User from '../models/user.model.js';

export const auth = async (req, res)=>{
    const { username, email, password} = req.body;

    const newUser = new User({ username, email, password});
    await newUser.save();
    res.status(201).json('User created successfully!!');


};