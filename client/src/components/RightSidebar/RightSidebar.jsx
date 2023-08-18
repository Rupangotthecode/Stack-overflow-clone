import React from 'react'
import './RightSidebar'
import Widget from './Widget'
import WidgetTags from './WidgetTags'
import { useMediaQuery } from 'react-responsive'

const RightSidebar = () => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
  const isMobile = useMediaQuery({ minWidth: 960, maxWidth: 1045})
  const isSmallMobile = useMediaQuery({query: '(max-width: 960px)'})

  return (
    <>
      {isDesktopOrLaptop && 
        <aside className="right-sidebar">
          <Widget/>
          <WidgetTags/>
        </aside>
      }
      {isMobile && 
        <aside className="right-sidebar">
          <Widget/>
          <WidgetTags/>
        </aside>
      }
      {isSmallMobile && 
        <div className="smob-right-sidebar">
          <Widget/>
          <WidgetTags/>
        </div>
      }
    </>
  )
}

export default RightSidebar
