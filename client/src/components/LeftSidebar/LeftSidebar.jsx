import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import {useTranslation} from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

const LeftSidebar = () => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
  const isMobile = useMediaQuery({query: '(max-width: 1045px)'})
  const {t} = useTranslation('LeftSidebar')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
    {isDesktopOrLaptop && 
      <div className='lappy-left-sidebar'> 
        <nav className='lappy-side-nav'>
          <NavLink to='/' className='lappy-side-nav-links' activeClassName='active'>
            <p>{t('home')}</p>
          </NavLink>
          <div className='lappy-side-nav-div'>
            <div style={{paddingLeft:'10px'}}><p>{t('public')}</p></div>
            <NavLink to='/Questions' className='lappy-side-nav-links' activeClassName='active' >
              <img src={Globe} alt="Globe"/>
              <p style={{paddingLeft:"10px"}}>{t('questions')}</p>
            </NavLink>
            <NavLink to='/Tags' className='lappy-side-nav-links' activeClassName='active' style={{paddingLeft:'40px'}}>
              <p>{t('tags')}</p>
            </NavLink>   
            <NavLink to='/Users' className='lappy-side-nav-links' activeClassName='active' style={{paddingLeft:'40px'}}>
              <p>{t('users')}</p>
            </NavLink>        
          </div>
        </nav>      
      </div>
    }
    {isMobile && 
      <div className='left-sidebar'> 
      <Button ref={btnRef} variant='outline' onClick={onOpen}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigate</DrawerHeader>
          <DrawerBody>
          <nav className='side-nav'>
          <NavLink to='/' className='side-nav-links' activeClassName='active'>
            <p>{t('home')}</p>
          </NavLink>
          <div className='side-nav-div'>
            <div style={{paddingLeft:'10px'}}><p>{t('public')}</p></div>
            <NavLink to='/Questions' className='side-nav-links' activeClassName='active' >
              <img src={Globe} alt="Globe"/>
              <p style={{paddingLeft:"10px"}}>{t('questions')}</p>
            </NavLink>
            <NavLink to='/Tags' className='side-nav-links' activeClassName='active' style={{paddingLeft:'40px'}}>
              <p>{t('tags')}</p>
            </NavLink>   
            <NavLink to='/Users' className='side-nav-links' activeClassName='active' style={{paddingLeft:'40px'}}>
              <p>{t('users')}</p>
            </NavLink>        
          </div>
        </nav>   
          </DrawerBody>
        </DrawerContent>
      </Drawer>    
      </div>
    }
    </>
  )
}

export default LeftSidebar
