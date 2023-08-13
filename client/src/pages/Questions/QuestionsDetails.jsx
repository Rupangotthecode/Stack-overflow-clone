import React from 'react'
import moment from 'moment'
import { useParams,Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import upvote from '../../assets/upvote.svg'
import downvote from '../../assets/downvote.svg'
import Avatar from '../../components/Avatar'
import DisplayAnswer from './DisplayAnswer'
import './Questions.css'
import { useState } from 'react'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'
const QuestionsDetails = () => {

  const {id} = useParams()
  console.log(id)
  const questionsList = useSelector(state => state.questionsReducer)

    //   var questionsList = [{ 
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
  
  const location = useLocation()
  const url = 'localhost:3000'
  const [answer, setAnswer] = useState('')
  const User = useSelector((state) => state.currentUserReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {t, i18n} = useTranslation('QuestionsDetails')
  const handlePostAns = (e, answerLength ) =>{

    e.preventDefault()
    if(User === null){
      alert(t('login_signup_to_answer'))
      navigate("/Auth")
    }
    else{
      if(answer === ''){
        alert(t('enter_answer_to_post'))
      }
      else{
        dispatch(postAnswer({id, noOfAnswers: answerLength, answerBodyEn: answer, userPosted: User.result.name, UserId: User.result._id}))
      }
    }
  }

  const handleShare = () =>{
    copy(url+location.pathname)
    alert("Copied "+ url+ location.pathname)
  }

  const handleDelete = () =>{
    dispatch(deleteQuestion(id,navigate))
  }

  const handleUpvote = () =>{
    dispatch(voteQuestion(id, 'upVote', User.result._id))
  }
  
  const handleDownvote = () =>{
    dispatch(voteQuestion(id, 'downVote', User.result._id))
  }

  const currentLanguage = i18n.language;
  
  const Translator = (question, data) =>{
    if(data === "Title"){
      switch(currentLanguage){
        case 'en':
          return question.questionTitleEn
        case 'fr':
          return question.questionTitleFr
        default: 
          return question.questionTitleEn
      }
    }
    else if(data === "Body"){
      switch(currentLanguage){
        case 'en':
          return question.questionBodyEn
        case 'fr':
          return question.questionBodyFr
        default: 
          return question.questionBodyEn
      }
    }
  }

  return (
    <div className="question-details-page">
      {
        questionsList.data === null?
        <h1>Loading...</h1>:
        <>
          {
            questionsList.data.filter(question => question._id === id).map(question =>(
              <div key={question._id}>
                <section className='question-details-container'>
                  <h1>{Translator(question, "Title")}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img src={upvote} alt="upvote" width='18' className='votes-icon' onClick={handleUpvote}/>
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img src={downvote} alt="downvote" width='18' className='votes-icon' onClick={handleDownvote}/>
                    </div>
                    <div style={{width: '100%'}}>
                      <p className='question-body'>{Translator(question, "Body")}</p>
                      <div className="question-details-tags">
                        {
                          question.questionTags.map((tag) =>(
                           <p key={tag}>{tag}</p>)
                          )
                        }
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type='button' onClick={handleShare}>{t('share')}</button>
                          {User?.result?._id === question.userId && <button type='button' onClick={handleDelete}>{t('delete')}</button>}
                        </div>
                        <div>
                          <p>{t('asked')} {moment(question.askedOn).fromNow()}</p>
                          <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                            <Avatar backgroundColor='orange' px='9px' py='9px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                            <div>
                              {question.userPosted}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {
                  question.noOfAnswers !== 0 && (
                    <section>
                      <h3>{question.noOfAnswers} {t('answers')}</h3>
                      <DisplayAnswer key={question._id} question={question} shareHandler = {handleShare}/>
                    </section>
                  ) 
                }
                <section className="post-ans-container">
                  <h3>{t('your_answer')}</h3>
                  <form onSubmit={(e) => {handlePostAns(e, question.answer.length +1)}}>
                    <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea><br />
                    <input type="submit" className='post-ans-btn' value={t('post_your_answer')}/>
                  </form>
                  <p>
                  {t('browse_tagged_questions')}
                    {
                      question.questionTags.map((tag) => (
                        <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                      ))
                    } {t('or')} 
                    <Link to='/AskQuestion'  style={{textDecoration: 'none', color: "009dff"}}> {t('ask_own_question')}</Link>
                  </p>
                </section>
              </div>
            ))
          }
        </>
      }
    </div>
  )
}

export default QuestionsDetails

