import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async(req, res) =>{
    const { id : _id} = req.params                        //params are the part of the url after the domain name..... eg: facebook.com*/name="rupan nag"*
    const { noOfAnswers, answerBody, userAnswered, UserId:userId} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question not found!")
    }
    updateNoOfAnswers(_id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId }]}})
        console.log(userId)
        return res.status(200).json(updatedQuestion)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateNoOfAnswers = async(_id, noOfAnswers ) =>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {"noOfAnswers": noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async(req,res) =>{
    const {id: _id} = req.params
    const {answerId, noOfAnswers} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send("Question unavailable...")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId))
    {
        return res.status(404).send("Answer unavailable...")
    }
    try {
        await Questions.updateOne(
            {_id},
            {$pull: {'answer': {_id : answerId}}}
        )
        return res.status(200).send("Successfuly deleted" )
    } catch (error) {
        return res.status(405).send(error.message)
    }
}

