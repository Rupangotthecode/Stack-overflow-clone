import * as api from '../api'

export const askQuestion = (questionData, navigate) => async(dispatch) =>{
    try {
        const {data}=await api.postQuestion(questionData)
        dispatch({type: "POST_QUESTION",payload: data})
        dispatch(fetchAllQuestions())
        navigate("/")
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllQuestions = () => async(dispatch) =>{
    try {
        const {data} = await api.getAllQuestions()
        dispatch({type:"FETCH_ALL_QUESTIONS", payload: data})
    } catch (error) {
        console.log(error)
    }
}



export const deleteQuestion = (id,navigate) => async(dispatch) =>{
    try{
        await api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate("/")
    }
    catch(error){
        console.log(error)
    }
}

export const postAnswer = (answerData) => async(dispatch) =>{
    try {
        
        const {id, noOfAnswers, answerBodyEn,  userPosted, UserId} = answerData
        const {data} = await api.postAnswer(id, noOfAnswers, answerBodyEn,  userPosted, UserId)
        dispatch({ type: "POST_ANSWER", payload: data})
        dispatch(fetchAllQuestions())
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = (answerData) =>async(dispatch) =>{
    try {
        const {id, ansId, noOfAnswers} = answerData
        console.log(id)
        await api.deleteAnswer(id, ansId, noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const voteQuestion = (questionId, value, UserId) =>async(dispatch) => {
    try{
        await api.voteQuestion(questionId, value, UserId)
        dispatch(fetchAllQuestions())
    }catch(error){
        console.log(error)
    }
}