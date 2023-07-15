import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import search from '../assets/search-solid.svg'
import logo from '../assets/logo.png'
import Avatar from './Avatar'
import './Navbar.css'
import decode from 'jwt-decode'
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentUser } from '../actions/currentUser';

const Navbar=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    },[dispatch])

    var User = useSelector((state)=> state.currentUserReducer)

    const handleLogout = () =>{
        localStorage.removeItem("Profile")
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
        navigate("/Auth")
    }



    useEffect(() => {    // token based auth. token dissolves after 1 hr so we check if the local storage has a jwt or not. We proceed only if there is one.
      const token = User?.token;
      if(token){
        const decodedToken=decode(token)
        if(decodedToken.exp *1000 < new Date().getTime()){
            handleLogout()
        }
      }
    }, [dispatch])
    

    return (
        <nav className='main-nav'>
            <div className="navbar">
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo'/>
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            
            <form>
                <input type="text" placeholder='Search...' />
                <img src={search} alt='search' width='18px' className='search-icon'/>
            </form>
            { User === null ?
                <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:
                <>
                    <Avatar backgroundColor='#009dff' px="10px" py="15px" borderRadius="50%" color='white'><Link to={`/User/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                </>
            }
            </div>
        </nav>
    );
}
export default Navbar;