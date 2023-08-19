import React from 'react'
import './Auth.css'
import { useTranslation } from 'react-i18next'
const Aboutauth = () => {

  const {t} = useTranslation("Aboutauth");

  return (
    <div className='auth-container-1'>
      <h1>{t('title')}</h1>
      <p>{t('points')}</p>
      <p>{t('tags_filters_jobs')}</p>
      <p>{t('reputation_badges')}</p>
      <p style={{fontSize:'13px', color:'#666767'}}>{t('private_group')}</p>
      <p style={{fontSize:'13px', color:'#007ac6'}}>{t('teams_free')}</p>
    </div>
  )
}

export default Aboutauth
