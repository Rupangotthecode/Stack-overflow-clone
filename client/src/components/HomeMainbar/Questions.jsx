import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../Avatar'

const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
      <div className="display-votes-ans">
        <p>{question.upVotes - question.downVotes}</p>
        <p>votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {
              question.questionTags.map((tag)=> (
                <p key={tag}>{tag}</p>
              ))
            }
          </div>
          <p className="display-time">
            asked {moment(question.askedOn).fromNow()}    
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
