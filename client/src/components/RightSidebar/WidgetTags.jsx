import React from 'react'

const WidgetTags = () => {
  const tags=['c','css','html','express','firebase','reactjs','java','javascript','c++','mern','mongodb','mySQL','next.js','node.js','php','python'];
  return (
    <div className='widget-tags'>
      <h4>Watched Tags</h4>
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
