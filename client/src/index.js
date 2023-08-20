import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers';



const store = createStore( Reducers, compose(applyMiddleware(thunk)))

const loadingMarkup = (
  <div>
    <h3>Loading..</h3>
  </div>
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Suspense fallback={loadingMarkup}>
    
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
    
  </Suspense>
);

