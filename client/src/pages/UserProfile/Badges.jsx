import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

const Badges = (props) => {
  
  const {t} = useTranslation('UserProfile')

  return (
    <div className='badges-main-container'>
        <div className="badge-list">
          <h3 style={{margin: "0px"}}>{t('badges_and_honours')} </h3>
            {props.badgeArray.map((badge)=>(
                <div className="badge" key={badge}>
                    <FontAwesomeIcon icon={faAward}/>
                    <span>{badge}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Badges
