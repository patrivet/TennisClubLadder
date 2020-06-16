import React, { useState } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import App from './../App';
import Login from './Login'

export default function Root() {
  return (
      <>
        <Switch>
          {/* <Route component={Login} path="/login" />
          <Route component={App} path="/ladder" />
          <Route component={Login} path="/" /> */}
          <Route component={Login} path="/login" />
          <Route component={App} path="/" />
        </Switch>
      </>
  )
}
