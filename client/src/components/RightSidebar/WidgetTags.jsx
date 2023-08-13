import React from 'react'
import { useTranslation } from 'react-i18next';

const WidgetTags = () => {

  const {t} = useTranslation("WidgetTags")

  const tags=['c','css','html','express','firebase','reactjs','java','javascript','c++','mern','mongodb','mySQL','next.js','node.js','php','python'];
  return (
    <div className='widget-tags'>
      <h4>{t("watched_tags")}</h4>
      <div className="widget-tags-div">
        {
          tags.map((tag)=> (
            <p key={tag}>{tag}</p>
          ))
        }
      </div>
    </div>
  )
}

export default WidgetTags
