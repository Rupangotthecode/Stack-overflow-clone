import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'}) //https://stack-overflow-clone21122.onrender.com

API.interceptors.request.use((req) => {
    if(localStorage.getItem("Profile")){
       req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}` 
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login',authData); //send the user dat to the server and receive the corresponding token and acknowledgemnet for each individual profile data.
export const signUp = (authData) => API.post('/user/signup',authData);

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get')
export const deleteQuestion = (id) => API.delete(`questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`questions/vote/${id}`,{value, userId})

export const postAnswer = (id , noOfAnswers , answerBodyEn , userAnswered, UserId) => API.patch(`answer/post/${id}`,{noOfAnswers, answerBodyEn, userAnswered, UserId})
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const getAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)

