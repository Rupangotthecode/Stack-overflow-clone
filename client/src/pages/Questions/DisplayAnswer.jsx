import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import {useSelector, useDispatch} from 'react-redux'
import './Questions.css' 
import moment from 'moment'
import { deleteAnswer } from '../../actions/question'
const DisplayAnswer = ({question, shareHandler}) => {

  const User = useSelector((state)=> state.currentUserReducer)
  const dispatch = useDispatch()
  const id = useParams()
  const handleDelete = (ansId, noOfAnswers) =>{
    dispatch(deleteAnswer(id, ansId, noOfAnswers-1))
  }

  return (
    <div>
      {
        question.answer.map((ans) => (
            <div className="display-ans" key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className="question-actions-user">
                  <div>
                    <button type="button" onClick={shareHandler}>Share</button>
                    {User?.result?._id === ans?.userId && <button type='button' onClick={()=>handleDelete(ans._id, question.noOfAnswers)}>Delete</button>}
                  </div>      
                <div>
                    <p>answered {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
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
