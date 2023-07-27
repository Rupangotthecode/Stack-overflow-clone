import mongoose from "mongoose"
import Users from '../models/auth.js'

export const IncreasePoints = async(id, points) =>{
    console.log(id, points)
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
        throw error;
    }
       
        await Users.findByIdAndUpdate( id, { $inc: {points: points}} );
    } catch (error) {
        console.log(error)
    }
}