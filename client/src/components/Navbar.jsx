import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import search from '../assets/search-solid.svg'
import logo from '../assets/logo.png'
import Avatar from './Avatar'
import './Navbar.css'
import decode from 'jwt-decode'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentUser } from '../actions/currentUser';
import { useTranslation } from 'react-i18next';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, MenuItem, MenuList, MenuButton, Button, Image} from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import smallLogo from '../assets/small_logo.png'
import i18n from '../i18next'
import {Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody} from '@chakra-ui/react'
import { useCallback } from 'react'

const Navbar=()=>{

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1023px)'})
    const isBigTablet = useMediaQuery({ minWidth: 767, maxWidth: 1023})
    const isSmallTablet = useMediaQuery({ minWidth: 592, maxWidth: 767})
    const isBigMobile = useMediaQuery( { minWidth: 500, maxWidth: 592} )
    const isSmallMobile = useMediaQuery({ query: '(max-width: 500px)' })
        
    const {t} = useTranslation("Navbar")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    },[dispatch,])

    var User = useSelector((state)=> state.currentUserReducer)

    const handleLogout = useCallback(() =>{
        localStorage.removeItem("Profile")
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
        navigate("/Auth")
    },[dispatch,navigate])

    useEffect(() => {    // token based auth. token dissolves after 1 hr so we check if the local storage has a jwt or not. We proceed only if there is one.
      const token = User?.token;
      if(token){
        const decodedToken=decode(token)
        if(decodedToken.exp *1000 < new Date().getTime()){
            handleLogout()
        }
      }
    }, [dispatch,handleLogout,User ])
    

    return (
        <>
        {isDesktopOrLaptop &&  
            <nav className='lappy-main-nav'>
                <div className="lappy-navbar">
                    <Link to='/' className='lappy-nav-item lappy-nav-logo'>
                        <img src={logo} alt='logo'/>
                    </Link>
                    <Link to='/' className='lappy-nav-item lappy-nav-btn'>{t("about")}</Link>
                    <Link to='/' className='lappy-nav-item lappy-nav-btn'>{t("products")}</Link>
                    <Link to='/' className='lappy-nav-item lappy-nav-btn'>{t("for_teams")}</Link>
                
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt='search' width='18px' className='lappy-search-icon'/>
                </form>
                <Menu>
            <MenuButton as={Button} borderRadius='50px' mr="1%">
                <FontAwesomeIcon icon={faGlobe } />
            </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>i18n.changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('hi')}>हिंदी</MenuItem>
                </MenuList>
            </Menu>
                { User === null ?
                    <Link to='/Auth' className='lappy-nav-item lappy-nav-links'>Log In</Link>:
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='lappy-nav-item lappy-nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
                </div>
            </nav>
        }
        {isBigTablet && 
            <nav className='main-nav'>
                <div className="navbar">
                    <Link to='/' className='nav-item nav-logo'>
                        <Image src={smallLogo} width='35px' height='35px' alt='logo'/>
                    </Link>
                    <Link to='/' className='nav-item lappy-nav-btn'>{t("products")}</Link>
                    <Link to='/' className='nav-item lappy-nav-btn'>{t("for_teams")}</Link>
                
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt='search' width='18px' className='search-icon'/>
                </form>
                <Menu>
            <MenuButton as={Button} borderRadius='50px' mr="1%">
                <FontAwesomeIcon icon={faGlobe } />
            </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>i18n.changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('hi')}>हिंदी</MenuItem>
                </MenuList>
            </Menu>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
                </div>
            </nav>
        }
        {isSmallTablet && 
            <nav className='main-nav'>
                <div className="navbar">
                    <Link to='/' className='nav-item nav-logo'>
                        <Image src={smallLogo} width='35px' height='35px' alt='logo'/>
                    </Link>
                    <Link to='/' className='nav-item lappy-nav-btn'>{t("products")}</Link>
                
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt='search' width='18px' className='search-icon'/>
                </form>
                <Menu>
            <MenuButton as={Button} borderRadius='50px' mr="1%">
                <FontAwesomeIcon icon={faGlobe } />
            </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>i18n.changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('hi')}>हिंदी</MenuItem>
                </MenuList>
            </Menu>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
                </div>
            </nav>
        }
        {isBigMobile && 
            <nav className='main-nav'>
                <div className="navbar">
                    <Link to='/' className='nav-item nav-logo'>
                        <Image src={smallLogo} width='35px' height='35px' alt='logo'/>
                    </Link>
                    <Link to='/' className='nav-item lappy-nav-btn'>{t("products")}</Link>
                
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt='search' width='18px' className='search-icon'/>
                </form>
                <Menu>
            <MenuButton as={Button} borderRadius='50px' mr="1%">
                <FontAwesomeIcon icon={faGlobe } />
            </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>i18n.changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('hi')}>हिंदी</MenuItem>
                </MenuList>
            </Menu>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        
                    </>
                }
                </div>
            </nav>
        }
        {isSmallMobile && 
            <nav className='main-nav'>
                <div className="navbar">
                    <Link to='/' className='nav-item nav-logo'>
                        <Image src={smallLogo} width='35px' height='35px' alt='logo'/>
                    </Link>
                    <Link to='/' className='nav-item lappy-nav-btn'>{t("products")}</Link>
                    <Popover>
                        <PopoverTrigger>
                            <Button variant='ghost'><img src={search} alt='search' width='18px' className='search-icon'/></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody><input type="text" placeholder='Search'/></PopoverBody>
                        </PopoverContent>
                    </Popover>
                <Menu>
            <MenuButton as={Button} borderRadius='50px' mr="1%">
                <FontAwesomeIcon icon={faGlobe } />
            </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>i18n.changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={()=>i18n.changeLanguage('hi')}>हिंदी</MenuItem>
                </MenuList>
            </Menu>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        
                    </>
                }
                </div>
            </nav>
        }
        </>
    );
}
export default Navbar;