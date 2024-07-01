import bcrypt from "bcryptjs/dist/bcrypt.js";
import { erroHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res)=>{
    res.json({
        message:"Hello world!!",
    });
};

export const updateUser = async (req, res, next) =>{
    if(req.user.id !== req.params.id){
        return next(erroHandler(401, 'You can update only your account!'));
    }

    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,

            {
                $set:{
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    avatar : req.body.avatar
                }
            },{new:true})

            const {password, ...rest} = updateUser._doc
            res.status(200).json({
                success:true,
                message : "User updated successfully",
                user: rest
            });

    } catch (error) {
        next(error);
    }
}