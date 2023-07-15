import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blackLogo from '../../assets/blacklogo.svg'
const Widget = () => {
  return (
    <div className='widget'>
        <h4>The Overflow Blog</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <img src={pen} alt="pen" width='18px'/>
            <p>Monitoring debt builds up faster than software teams can pay it off</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={pen} alt="pen" width='18px'/>
            <p>Because the only thing worse than building internal tools is maintaining them...</p>
          </div>
        </div>
        <h4>Featured on Meta</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <img src={comment} alt="pen" width='18px'/>
            <p>Ticket smash for [status-review] tag: Part Deux</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={comment} alt="pen" width='18px'/>
            <p>We've added a "Necessary cookies only" option to the cookie consent popup</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>We've made changes to our Privacy Notice for Collectives™</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>The [amazon] tag is being burninated</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>Microsoft Azure Collective launch and proposed tag changes</p>
          </div>
          <div className="right-sidebar-div-2">
            <img src={blackLogo} alt="pen" width='18px'/>
            <p>Temporary policy: ChatGPT is banned</p>
          </div>
        </div>
        <h4>Hot Meta Posts</h4>
        <div className="right-sidebar-div-1">
          <div className="right-sidebar-div-2">
            <p>38</p>
            <p>Why was the spam flag declined, yet the question marked as spam?</p>
          </div>
          <div className="right-sidebar-div-2">
            <p>20</p>
            <p>What is the best course of action when a user has high enough rep to...</p>
          </div>
          <div className="right-sidebar-div-2">
            <p>14</p>
            <p>Is a link to the "How to ask" help page a useful comment?</p>
          </div>
        </div>
    </div>
  )
}

export default Widget
