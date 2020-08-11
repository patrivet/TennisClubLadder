import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './../App';
import PlayerDetail from './../components/PlayerDetail';

export default function Dashboard() {
  return (
    <Switch>
      <Route path='/player/:id' component={PlayerDetail} />
      <Route path='/' component={App} />
    </Switch>
  )
}
