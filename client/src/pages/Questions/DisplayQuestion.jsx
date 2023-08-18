import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'
import { useMediaQuery } from 'react-responsive'
import './Questions.css'
const DisplayQuestion = () => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
  const isMobile = useMediaQuery({ minWidth: 960, maxWidth: 1045})
  const isSmallMobile = useMediaQuery({query: '(max-width: 960px)'})

  return (
    <>
    {isDesktopOrLaptop && <div className='home-container-1'>
      <LeftSidebar/>
      <div className="home-container-2">
        <QuestionsDetails/>
        <RightSidebar/>
      </div>
    </div>}
    {isMobile && <div className='mob-home-container-1'>
      <LeftSidebar/>
      <div className="mob-home-container-2">
        <QuestionsDetails/>
        <RightSidebar/>
      </div>
    </div>}
    {isSmallMobile && <div className='smob-home-container-1'>
      <LeftSidebar/>
      <div className="smob-home-container-2">
        <QuestionsDetails/>
        <RightSidebar/>
      </div>
    </div>}
    </>
  )
}

export default DisplayQuestion
