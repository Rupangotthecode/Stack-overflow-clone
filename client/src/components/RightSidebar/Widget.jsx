import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blackLogo from '../../assets/blacklogo.svg'
import {useTranslation} from 'react-i18next'

const Widget = () => {
  
  const {t} = useTranslation("Widget")
  
  return (
    <div className='widget'>
        <h4>{t('title')}</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <img src={pen} alt="pen" width='18px'/>
            <p>{t('content_1.0')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={pen} alt="pen" width='18px'/>
            <p>{t('content_1.1')}</p>
          </div>
        </div>
        <h4>{t('featured_on_meta')}</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <img src={comment} alt="pen" width='18px'/>
            <p>{t('content_2.0')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={comment} alt="pen" width='18px'/>
            <p>{t('content_2.1')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>{t('content_2.2')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>{t('content_2.3')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>{t('content_2.4')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>{t('content_2.5')}</p>
          </div>
        </div>
        <h4>{t('hot_meta_posts')}</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <p>38</p>
            <p>{t('content_3.0.text')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <p>20</p>
            <p>{t('content_3.1.text')}</p>
          </div>
          <div className="right-sidebar-div-2">
            <p>14</p>
            <p>{t('content_3.2.text')}</p>
          </div>
        </div>
    </div>
  )
}

export default Widget
