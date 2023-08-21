import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import {useSelector, useDispatch} from 'react-redux'
import './Questions.css' 
import moment from 'moment'
import { deleteAnswer } from '../../actions/question'
import { useTranslation } from 'react-i18next'

const DisplayAnswer = ({question, shareHandler}) => {
  const {t,i18n} = useTranslation('DisplayAnswer')
  const currentLanguage = i18n.language;
  const User = useSelector((state)=> state.currentUserReducer)
  const dispatch = useDispatch()
  const id = useParams()
  console.log(id)
  const handleDelete = (ansId, noOfAnswers) =>{
    dispatch(deleteAnswer({id: id.id, ansId: ansId, noOfAnswers: noOfAnswers-1}))
  }
  const Translator = (ans) =>{
      switch(currentLanguage){
        case 'en':
          return ans.answerBodyEn
        case 'fr':
          return ans.answerBodyFr
          case 'hi':
            return ans.answerBodyHi
        default: 
          return ans.answerBodyEn
      }
  }

  return (
    <div>
      {
        question.answer.map((ans) => (
            <div className="display-ans" key={ans._id}>
                <p>{Translator(ans)}</p>
                <div className="question-actions-user">
                  <div>
                    <button type="button" onClick={shareHandler}>{t('share')}</button>
                    {User?.result?._id === ans?.userId && <button type='button' onClick={()=>handleDelete(ans._id, question.noOfAnswers)}>{t('delete')}</button>}
                  </div>      
                <div>
                    <p>{t('answered')} {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                        <Avatar backgroundColor='green' px='9px' py='11px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                        <div>
                            {ans.userAnswered}
                        </div>
                    </Link>
                  </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer


