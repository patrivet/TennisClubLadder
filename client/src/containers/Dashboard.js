import React, { useState, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './../App';
import PlayerDetail from './../components/PlayerDetail';
import Login from '../components/Login';
import Header from './../components/Header';
import Register from './../components/Register';

export default function Dashboard (props) {

  const authCheck = () => {
    // Get accessToken from localStorage and check if expired.
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return false;
    // Extract the 2nd part of token - payload (json)
    const accessTokenPayload = atob(accessToken.split('.')[1]);
    const iat = JSON.parse(accessTokenPayload).iat;

    // check curent time is <= the issued at time (iat) + 30 mins
    // 30 mins as millis // ((1000 * 60)*30);
    const expireTime = (iat * 1000) + ((1000 * 60)*30);
    return (Date.now() <= expireTime);
  };

  const [isAuth, setIsAuth] = useState(() => authCheck());

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

        <Route path='/register' component={Register}/>

        {/* Login route */}
        {!isAuth &&
          <Route path='/' render={ (props) => (
            <Login {...props} setIsAuth={setIsAuth}/>
          )}/>
        }

        {/* Authenticated base route */}
        {isAuth &&
          <Route path='/' render={ (props) => (
            <>
              <Header {...props} setIsAuth={setIsAuth} />
              <App {...props} />
            </>
          )}/>
        }
      </Switch>

  )
}
