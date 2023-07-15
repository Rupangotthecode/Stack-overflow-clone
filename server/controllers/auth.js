import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'

export const signup =async (req,res) =>{
    const { name, email, password} = req.body;
    try{
        const existinguser = await users.findOne({ email });//check is user already exists
        if(existinguser){
            return res.status(404).json({ message: "User already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 12)//converting password into a very computationally heavy hashed object to prevent attackers from accessing the password.
        const newUser = await users.create({name,email,password: hashedPassword})//inserting values into the model table.
        const token = jwt.sign({email:newUser.email, id:newUser._id},process.env.JWT_SECRET,{expiresIn: '1h'});//return response from server 
        res.status(200).json({result: newUser, token})//response provided to frontend
    }catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login =async (req,res) =>{
    const {email,password}=req.body;
    try{
        const existinguser=await users.findOne({email});
        if(!existinguser){
            return res.status(404).json({message:"User doesn't Exist."})
        }
        else{
            const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
            if(!isPasswordCrt){
                return res.status(400).json({message: "Invalid credentials"})                 
            }
            const token = jwt.sign({email:existinguser.email, id:existinguser._id},process.env.JWT_SECRET,{expiresIn: '1h'});
            res.status(200).json({result: existinguser, token})
        }
    }catch(error){
        res.staus(500).json("Something went wrong...")
    }
}