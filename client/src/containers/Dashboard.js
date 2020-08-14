import React, { useState, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './../App';
import PlayerDetail from './../components/PlayerDetail';
import Login from '../components/Login';
import Header from './../components/Header';

export default function Dashboard (props) {
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem("auth"));

  return (
      <Switch>
        {isAuth &&
          <Route exact path='/home' render={ (props)=> (
            <>
              <Header {...props} setIsAuth={setIsAuth} />
              <App {...props} />
            </>
          )}/>
        }
        { isAuth && <Route path='/player/:id' component={PlayerDetail} />}

        {!isAuth &&
          <Route path='/' render={ (props) => (
            <Login {...props} setIsAuth={setIsAuth}/>
          )}/>
        }
      </Switch>

  )
}
