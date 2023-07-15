import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import AllRoutes from './AllRoutes'
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <div className='app'>
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
