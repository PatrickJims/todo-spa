//react toastify notification related
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';

//toast.configure()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }
  
  


  useEffect(() => {
    async function isAuthEffect(){
      try {
        const responce = await fetch('http://localhost:5000/auth/is-verify', {
          method: 'GET',
          headers: {token: localStorage.token},
        });
        const parseRes = await responce.json()
        console.log(parseRes);
        parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    }
    isAuthEffect();
  },[]);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route 
            exact path='/' 
            element={isAuthenticated ? <Landing setAuth={setAuth}/> : <Navigate to='/login' />} />
          <Route 
            exact path='/register' 
            element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to='/' />} />
          <Route 
            exact path='/login' 
            element={ !isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to='/' />} />
            
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;