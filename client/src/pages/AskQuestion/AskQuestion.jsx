import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question.js'
import {useTranslation} from 'react-i18next'
const AskQuestion = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  
  const User = useSelector((state) => state.currentUserReducer)
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(questionTitle, questionBody, questionTags)
    dispatch(askQuestion({questionTitleEn: questionTitle, questionBodyEn:questionBody, questionTags, userPosted : User.result.name, userId: User.result._id}, navigate)) 
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      setQuestionBody(questionBody + '\n')
    }
  }

  const {t} = useTranslation('AskQuestion')
    
  return (
    <div className="ask-question">
      <div className="aq-padder">
        <div className="ask-ques-container">
          <h1>{t('title')}</h1>
          <form>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>{t('Description')}</p>
                <input type="text" id="ask-ques-title" onChange={(e)=>setQuestionTitle(e.target.value)} placeholder={t('question_example')}/>
              </label>
              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>{t('information_needed')}</p>
                <textarea name="ask-ques-body" id="ask-ques-body" cols="30" rows="10" onChange={(e)=>setQuestionBody(e.target.value)} onKeyPress={handleEnter}></textarea>
                
              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>{t('tags_description')}</p>
                <input type="text" id="ask-ques-tags" placeholder='e.g (xml typescript word)' onChange={(e)=>setQuestionTags(e.target.value.split(" "))}/>
              </label>
            </div>
            <input type="submit" value={t('review_question')} className='review-btn' onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion
