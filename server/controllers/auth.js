import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UAParser } from 'ua-parser-js';
import users from '../models/auth.js'
import { getIP } from './Utilities.js';

export const signup =async (req,res) =>{
    const { name, email, password} = req.body;
    try{
        const existinguser = await users.findOne({ email });//check is user already exists
        if(existinguser){
            return res.status(404).json({ message: "User already exists."})
        }
        const { browser, device } = UAParser(req.headers["user-agent"]);
        let deviceName = ''
        if(device.vendor){
            deviceName = device.vendor + device.model ;
        }
        else{
            deviceName = browser.name + browser.version;
        }
        const hashedPassword = await bcrypt.hash(password, 12)//converting password into a very computationally heavy hashed object to prevent attackers from accessing the password.
        const ipAddr = await getIP();
        const newUser = await users.create({name,email,password: hashedPassword, loginHistory: [{ipAddress: ipAddr, device: deviceName}]})//inserting values into the model table.
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
            const ipAddr = await getIP();
            const { browser, device } = UAParser(req.headers["user-agent"]);
            console.log(device)
            let deviceName = ''
            if(device.vendor){
                deviceName = device.vendor + device.model ;
  
            }
            else{
                deviceName = browser.name + browser.version;
            }
            if(!isPasswordCrt){
                return res.status(400).json({message: "Invalid credentials"})                 
            }
            const token = jwt.sign({email:existinguser.email, id:existinguser._id},process.env.JWT_SECRET,{expiresIn: '1h'});
            await users.findByIdAndUpdate(existinguser._id, {$addToSet: {'loginHistory': [{ipAddress: ipAddr, device: deviceName}]}})
            res.status(200).json({result: existinguser, token})
        }
    }catch(error){
        res.staus(500).json("Something went wrong...")
    }
}