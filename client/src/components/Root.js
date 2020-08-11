import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../containers/Dashboard';

export default function Root() {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  )
}
