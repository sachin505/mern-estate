import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const userAuth= async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    console.log(username+" "+email+" "+password);
    const newUser=new User({username,email,password :hashedPassword});
    try{
        await newUser.save();
    res.status(201).json("user created successfully");
    }
    catch(err){
        next(err);
    }
}