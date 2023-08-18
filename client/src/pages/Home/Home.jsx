import React from 'react'
import '../../App.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import { useMediaQuery } from 'react-responsive'
const Home = () => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
  const isMobile = useMediaQuery({ minWidth: 960, maxWidth: 1045})
  const isSmallMobile = useMediaQuery({query: '(max-width: 960px)'})


  return (
    <>
    {isDesktopOrLaptop && 
      <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
          <HomeMainbar/>
          <RightSidebar/>
        </div>
      </div>
    }
    {isMobile && 
      <div className='mob-home-container-1'>
        <LeftSidebar/>
        <div className="mob-home-container-2">
          <HomeMainbar/>
          <RightSidebar/>
        </div>
      </div>
    }
    {isSmallMobile && 
      <div className='mob-home-container-1'>
        <LeftSidebar/>
        <div className="smob-home-container-2">
          <HomeMainbar/>
          <RightSidebar/>
        </div>
      </div>
    }
    </>
  )
}

export default Home
