import React, { useState, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './../App';
import PlayerDetail from './../components/PlayerDetail';
import Login from '../components/Login';
export const HasAuthContext = createContext();

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <HasAuthContext.Provider value={setIsAuth}>
      <Switch>
        { isAuth && <Route exact path='/home' component={App} />}
        { isAuth && <Route path='/player/:id' component={PlayerDetail} />}
        {!isAuth && <Route path='/' component={Login} />}
      </Switch>
    </HasAuthContext.Provider>
  )
}
