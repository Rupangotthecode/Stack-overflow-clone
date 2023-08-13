import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'
import {useTranslation} from 'react-i18next'


const HomeMainbar = () => {

  const questionsList = useSelector(state => state.questionsReducer)

    // var questionsList = [{ 
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{ 
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{ 
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }]

  
  const user=1;
      const navigate = useNavigate()
      const checkAuth = () =>{
        if(user===null)
        {
          alert("Login/sign up to ask!")
          navigate('/Auth')
        }
        else{
          navigate('/AskQuestion')
        }
      }
  const location = useLocation()

  const {t} = useTranslation('HomeMainbar')
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === '/'? <h1>{t('top_questions_heading')}</h1> : <h1>{t('top_questions_heading')}</h1>}
        <button onClick={checkAuth} className='ask-btn'>{t('ask_question_button_text')}</button>
      </div>
      
      <div>
        {questionsList.data ===null?
        <h1>{t('loading_message')}</h1>:
        <>
          <h4>{questionsList.data.length} {t('questions')}</h4>
          <QuestionList questionsList={questionsList.data}/>
        </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
