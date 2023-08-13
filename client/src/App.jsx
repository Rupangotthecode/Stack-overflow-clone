import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import AllRoutes from './AllRoutes'
import {ChakraProvider} from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import './App.css';

const theme = extendTheme({
  fonts: {
    heading: 'Segoe UI',
    body: 'Segoe UI'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
      h1:{
        fontSize: '4xl',
        fontWeight: 'bold',
        paddingTop: '5px',
        paddingBottom: '5px'
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
        paddingTop: '5px',
        paddingBottom: '5px'
      },
      h3: {
        fontSize: 'xl',
        fontWeight: 'bold',
        paddingTop: '5px',
        paddingBottom: '5px'
      },
      h4: {
        fontSize: 'xl',
        fontWeight: 'medium',
        paddingTop: '5px',
        paddingBottom: '5px'
      },
      p :{
        fontSize: 'sm',
        fontWeight: 'normal',
        paddingTop: '5px',
        paddingBottom: '5px'
      }
    }
  }
});

function App() {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])
  
  return (
    <ChakraProvider theme={theme}>
    <div className='app' >
      
      <Router >
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
    </ChakraProvider>
  );
}

export default App;
