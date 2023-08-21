import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../Avatar'
import {useTranslation} from 'react-i18next'

const Questions = ({question}) => {

  const {t,i18n} = useTranslation('Question')

  const currentLanguage = i18n.language;
  
  const Translator = (question, data) =>{
    if(data === "Title"){
      switch(currentLanguage){
        case 'en':
          return question.questionTitleEn
        case 'fr':
          return question.questionTitleFr
        case 'hi':
          return question.questionTitleHi
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
        case 'hi':
          return question.questionBodyHi
        default: 
          return question.questionBodyEn
      }
    }
  }

  return (
    <div className='display-question-container'>
      <div className="display-votes-ans">
        {question && <p>{question.upVote.length - question.downVote.length}</p>}
        <p>{t('votes')}</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>{t('answers')}</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Questions/${question._id}`} className='question-title-link'>{Translator(question, "Title")}</Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {
              question.questionTags.map((tag)=> (
                <p key={tag}>{tag}</p>
              ))
            }
          </div>
          <p className="display-time">
            {t('asked')} {moment(question.askedOn).fromNow()}    
            <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8', textDecoration: "none"}} >
              <Avatar backgroundColor='green' px='9px' py='11px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar> 
              <div>
              {question.userPosted}
              </div> 
            </Link>       
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
