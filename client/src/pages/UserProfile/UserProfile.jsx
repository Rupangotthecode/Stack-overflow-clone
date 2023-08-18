import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Badges from './Badges'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'
import { fetchAllUsers } from '../../actions/users'
import { useTranslation } from 'react-i18next'
import LoginHistory from './LoginHistory'
import {Box, SlideFade} from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import { setCurrentUser } from '../../actions/currentUser';
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {
    const {t} = useTranslation('UserProfile')

    

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
    const isMobile = useMediaQuery({query: '(max-width: 1045px)'})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchAllUsers())
    },[dispatch])

    

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)
    const [History, setHistory] = useState(false)
    const handleHistory = () =>{
        setHistory((prevState) => !prevState)
        setSwitch(false)
    }

    const handleLogout = () =>{
        localStorage.removeItem("Profile")
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
        navigate("/Auth")
    }

    return (
        <>
        {isDesktopOrLaptop && <div className='profile-home-container-1'>
            <LeftSidebar />
            <div className="profile-home-container-2">
                
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px="7%" py="7%">
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <div className="user-name-inner-box">
                                    <h1 style={{ margin: "0px"}}>{currentProfile?.name}</h1>
                                    <p style={{ margin: "0px"}}><FontAwesomeIcon icon={faBirthdayCake} /> {t('joined')} {moment(currentProfile?.joinedOn).fromNow()}</p>
                                    <h2 style={{ margin: "0px"}}>{t('points_earned')}: {currentProfile?.points}</h2>
                                    <h4 style={{margin: "0px"}}> {t('contribution_level')}: {currentProfile?.contributionLevel ?currentProfile.contributionLevel:'none'}</h4>
                                    {currentProfile && <Badges badgeArray={currentProfile.badges}/>}
                                </div>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <div className="profile-button-data">
                                    <div className='profile-buttons'>
                                        <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                            <FontAwesomeIcon icon={faPen} /> {t('edit_profile2')}
                                        </button>
                                        <button type='button' onClick={handleHistory} className='edit-profile-btn'>
                                            Login History
                                        </button>
                                    </div>
                                    
                                </div>
                            ) 
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} setHistory={setHistory}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                {History && 
                    <div className="login-history">
                        <SlideFade in={History} offsetY='20px'>
                            <Box
                            p='20px'
                            color='black'
                            mt='4'
                            bg='white'
                            rounded='md'
                            shadow='md'
                            width='100%'
                            overflowY='scroll'
                            height="300px"
                            >
                                <LoginHistory data={currentProfile.loginHistory}/>
                            </Box>
                        </SlideFade>                        
                    </div>
                }
            </div>
        </div>}
        {isMobile && 
        <div className='mob-profile-home-container-1'>
            <LeftSidebar />
            <div className="mob-profile-home-container-2">
                
                    <div className="mob-user-details-container">
                        <div className='mob-user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px="20%" py="20%" borderRadius='50%'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="mob-user-name">
                                <div className="mob-user-name-inner-box">
                                    <h1 style={{ margin: "0px"}}>{currentProfile?.name}</h1>
                                    <p style={{ margin: "0px"}}><FontAwesomeIcon icon={faBirthdayCake} /> {t('joined')} {moment(currentProfile?.joinedOn).fromNow()}</p>
                                    <h2 style={{ margin: "0px"}}>{t('points_earned')}: {currentProfile?.points}</h2>
                                    <h4 style={{margin: "0px"}}> {t('contribution_level')}: {currentProfile?.contributionLevel ?currentProfile.contributionLevel:'none'}</h4>
                                    {currentProfile && <Badges badgeArray={currentProfile.badges}/>}
                                </div>
                            </div>
                            <>
                                {
                                    Switch ? (
                                        <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} setHistory={setHistory}/>
                                    ) : (
                                        <ProfileBio currentProfile={currentProfile}/>
                                    )
                                }
                            </>
                             
                            {!Switch && <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>}
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <div className="mob-profile-button-data">
                                    <div className='profile-buttons'>
                                        <button type='button' onClick={() => setSwitch(true)} className='mob-edit-profile-btn'>
                                            <FontAwesomeIcon icon={faPen} /> 
                                        </button>
                                        
                                    </div>
                                    
                                </div>
                            ) 
                        }
                        
                    </div>
                    {
                        (currentUser?.result._id === id ) && (                           
                            <button type='button' onClick={handleHistory} className='edit-profile-btn'>
                                Login History
                            </button>
                        ) 
                    }
                {History && 
                    <div className="login-history">
                        <SlideFade in={History} offsetY='20px'>
                            <Box
                            p='20px'
                            color='black'
                            mt='4'
                            bg='white'
                            rounded='md'
                            shadow='md'
                            width='100%'
                            overflowY='scroll'
                            height="300px"
                            >
                                <LoginHistory data={currentProfile.loginHistory}/>
                            </Box>
                        </SlideFade>                        
                    </div>
                }
            </div>
        </div>}
        </>
    )
}

export default UserProfile
