import React,{useState} from 'react'
import authLogo from '../../assets/small_logo.png'
import Aboutauth from './Aboutauth'
import './Auth.css'
import { signup,login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery} from 'react-responsive'
import { Heading } from '@chakra-ui/react'

const Auth = () => {

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1045px)'})
  const isMobile = useMediaQuery({query: '(max-width: 1045px)'})

  const [isSignup,setisSignup]=useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setisSignup(!isSignup)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!email && !password){
        alert("Enter email and password")
      }
    if(isSignup){ 
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name, email, password},navigate))
    }else{
      dispatch(login({email,password},navigate))
    }
  }

  const {t} = useTranslation("Auth")

  return (
    <>
    {isDesktopOrLaptop && <section className='auth-section'>
        { isSignup && <Aboutauth/>}
        <div className='auth-container-2'>
          {!isSignup && <img src={authLogo} style={{width: '20%', height: '20%'}} alt='Stack Overflow' className='login-logo' />}
          <form onSubmit={handleSubmit}>
            {isSignup &&
              <label htmlFor="name"> 
                <h4>{t('display_name')}</h4> 
                <input type="text" name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
              </label>}
            <label htmlFor="email">
              <h4>Email</h4>
              <input type='email' name='email' id='email'  onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:'flex' ,justifyContent:'space-between'}}>
                <h4>Password</h4>
                {!isSignup && <p style={{color:'#007ac6',fontSize:'13px'}}>{t('forgot_password')}</p>}
              </div> 
              <input type='password' name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
            </label>
            {isSignup && <p>{t('password_requirements')}</p>}
            {isSignup && 
                <label htmlFor="check" className='checker'>
                  <input type="checkbox" name='check' id='check' style={{width:'20px'}}/>
                  <p>{t('opt_in_message')}</p>
                </label>
            }
            <button type='submit' className='auth-btn'>{isSignup?'Sign Up':'Log in'}</button>
            {isSignup && <p style={{color:'#666767', fontSize:'13px'}}>{t('terms_privacy_cookie_policy')}</p>}

          </form>
          <p>
            {isSignup?t('already_have_account'):t('dont_have_account')}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup?'Log in':'Sign Up'}</button>
          </p>
        </div>
    </section>
    }
    {isMobile && <section className='mob-auth-section'>
      <div className="mob-dummy-container">
        <img src={authLogo} style={{width: '140px', height: '110px'}} alt='Stack Overflow' className='login-logo' />
          { isSignup && <Heading textAlign='center' size='lg' width='80%'>Join the Stack Overflow community. It is free and only takes a minute!</Heading>}
        <div className='mob-auth-container-2'>
          
          <form onSubmit={handleSubmit}>
            {isSignup &&
              <label htmlFor="name"> 
                <h4>{t('display_name')}</h4> 
                <input type="text" name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
              </label>}
            <label htmlFor="email">
              <h4>Email</h4>
              <input type='email' name='email' id='email'  onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">
              <div style={{display:'flex' ,justifyContent:'space-between'}}>
                <h4>Password</h4>
                
              </div> 
              <input type='password' name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
            </label>
            {isSignup && <p>{t('password_requirements')}</p>}
            {isSignup && 
                <label htmlFor="check" className='checker'>
                  <input type="checkbox" name='check' id='check' style={{width:'20px'}}/>
                  <p>{t('opt_in_message')}</p>
                </label>
            }
            <button type='submit' className='auth-btn'>{isSignup?'Sign Up':'Log in'}</button>
            {isSignup && <p style={{color:'#666767', fontSize:'13px'}}>{t('terms_privacy_cookie_policy')}</p>}
            {!isSignup && <p style={{color:'#007ac6',fontSize:'13px'}}>{t('forgot_password')}</p>}
          </form>
          <p>
            {isSignup?t('already_have_account'):t('dont_have_account')}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup?'Log in':'Sign Up'}</button>
          </p>
          </div>
        </div>
    </section>
    }
    </>
  )
}

export default Auth
