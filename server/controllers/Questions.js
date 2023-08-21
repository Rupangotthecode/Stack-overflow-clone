import mongoose from "mongoose";
import Question from '../models/Questions.js'
import Questions from "../models/Questions.js";
import Users from "../models/auth.js"
import { IncreasePoints, CheckContribution, QuestionFinder, HelperChecker,Translator } from "./Utilities.js";

export const AskQuestion = async(req,res) =>{
    const postQuestionData = req.body;
    const questionTitleFr = await Translator(postQuestionData.questionTitleEn, 'fr')
    const questionBodyFr = await Translator(postQuestionData.questionBodyEn, 'fr')
    const questionTitleHi = await Translator(postQuestionData.questionTitleEn, 'hi')
    const questionBodyHi = await Translator(postQuestionData.questionBodyEn, 'hi')
    const postQuestion = new Question({...postQuestionData, questionBodyFr: questionBodyFr, questionTitleFr: questionTitleFr, questionBodyHi: questionBodyHi, questionTitleHi: questionTitleHi})
    
    try{
        await postQuestion.save();
        await Users.findByIdAndUpdate(postQuestionData.userId, { $addToSet:{'Questions': {questionId: postQuestion._id, questionTitleEn: postQuestion.questionTitleEn, questionTitleFr: postQuestion.questionTitleFr, questionBodyEn: postQuestion.questionBodyEn, questionBodyFr: postQuestion.questionBodyFr, questionBodyHi: postQuestion.questionBodyHi, questionTitleHi: postQuestion.questionTitleHi,  upVotes: 0, downVotes: 0}}})
        await CheckContribution(postQuestionData.userId)
        await IncreasePoints(postQuestionData.userId, 5)
        res.status(200).json("Posted a question successfully")
    }
    catch(error){
        console.log(error)
        res.status(409).json("Unable to post new question")
    }
}

export const getAllQuestions = async(req,res) =>{
    try {
        const questionList = await Questions.find()
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

}

export const deleteQuestion = async(req,res) =>{
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question not found")//return keyword sets the parameters of the the return body andd sends the message immediately. no further logic is implemented.
    }
    try {
        await Questions.findByIdAndRemove( _id );
        res.status(200).json({message:"Question deleted successfully"}) //no return keyword is used as response is not sent immediately, but the parameter are set
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const voteQuestion = async(req,res) =>{
    const {id : _id} = req.params;
    const {value, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question not found")//return keyword sets the parameters of the the return body andd sends the message immediately. no further logic is implemented.
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex  = await question.upVote.findIndex((id) => id === String(userId))
        const downIndex  = await question.downVote.findIndex((id) => id === String(userId))

        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote= await question.downVote.filter((id) => id !== String(userId))
            } 
            if(upIndex === -1){
                await question.upVote.push(userId)
            }else{
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote= await question.upVote.filter((id) => id !== String(userId))
            } 
            if(downIndex === -1){
                await question.downVote.push(userId)
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        if((question.upVote.length - question.downVote.length === 5) && (question.rewards.marker5 === false)){
            IncreasePoints(question.userId, 20);
            question.rewards.marker5 =true
        }
        if((question.upVote.length - question.downVote.length === 10) && (question.rewards.marker10 === false)){
            IncreasePoints(question.userId, 40);
            question.rewards.marker10 =true
        }
        if((question.upVote.length - question.downVote.length === 20) && (question.rewards.marker20 === false)){
            IncreasePoints(question.userId, 100);
            question.rewards.marker20 =true
        }
        await Questions.findByIdAndUpdate(_id , question)
        await QuestionFinder(question.userId, _id, question.upVote.length, question.downVote.length)
        await HelperChecker(question.userId)
        return res.status(200).send("Voted successfully!")
    } catch (error) {
        return res.status(404).send("Invalid Id...")
    }
}