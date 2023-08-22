import mongoose from "mongoose"
import Users from '../models/auth.js'
import axios from 'axios'

export const IncreasePoints = async(id, points) =>{
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
        throw error;
    }
        
        await Users.findByIdAndUpdate( id, { $inc: {points: points}} );
        
    } catch (error) {
        console.log(error)
    }
}

export const CheckContribution = async(id) =>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return 0;
    }
    try {
        const user = await Users.findById( id )
        switch (user.Questions.length + user.noOfAnswers) {
            case 5:
                user.contributionLevel = 'rookie'
                break;
            case 10:
                user.contributionLevel = 'intermediate'
                break;  
            case 20:
                user.contributionLevel = 'pro'
                break;      
            default:
                break;
        }
        await Users.findByIdAndUpdate(id, user)
        
    } catch (error) {
        console.log(error)
    }
}

export const QuestionFinder = async(userId, quesId, upVotes, downVotes) =>{
    const user = await Users.findById(userId);
    const question = await user.Questions.filter((question) => question.questionId === quesId)  
    question[0].upVotes = upVotes;
    question[0].downVotes = downVotes;
    const newQuestionArray = user.Questions.filter((question) => question.questionId !== quesId)
    newQuestionArray.push(question[0])
    user.Questions = newQuestionArray
    await Users.findByIdAndUpdate(userId, user)
}

export const HelperChecker = async(userId) =>{
    const user = await Users.findById(userId);    
    const validQuestions = await user.Questions.filter((question) => (question.upVotes - question.downVotes >= 5))
    if(validQuestions.length === 5 && user.badges.indexOf("Helper")===-1){
        await user.badges.push("Helper")
        await Users.findByIdAndUpdate(userId, user)
        await IncreasePoints(userId, 500)
    }   
}

export const TutorChecker = async(userId) =>{
    const user = await Users.findById(userId);
    if(user.noOfAnswers >= 5 && user.badges.indexOf("Tutor")=== -1){
        await user.badges.push('Tutor')
        await Users.findByIdAndUpdate(userId, user)
        await IncreasePoints(userId, 200)
    }
}

export const Translator = async(data, to) =>{
    const apiUrl = 'https://translate.argosopentech.com/translate';

    try {
        const response = await axios.post(apiUrl, {
            q: data,
            source: "en",
            target: to
    },
	   { headers: { "Content-Type": "application/json" }}
    );
        if (response.status === 200) {
            return(response.data.translatedText)
        }
        else{
            console.log("Error", response.status)
        }
    }
    catch (error) {
        console.error('Error during translation:', error.message);
    
    }
}

export const getIP = async() =>{
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const data = response.data;
        return data.ip
    } catch (error) {
        console.log(error.message)
    }
}
