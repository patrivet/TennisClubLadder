import React, { useState, useContext } from 'react'
import {HasAuthContext} from '../containers/Dashboard';

export default function Login(props) {
  const setIsAuth = useContext(HasAuthContext);
  const [ state, setState ] = useState({ email: '', password : ''});

  function handleFormChange(e) {
    const { name, value } = e.target;
    setState( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleFormSubmit (e) {
    e.preventDefault();
    // Authentication check TODO here

    // Update the URL to /home using history
    props.history.push('/home');
    // set Auth to true.
    setIsAuth(true);
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleFormSubmit}>
        <input
          name='email'
          placeholder='Email'
          onChange={handleFormChange}
          required
        />
        <input
          name='password'
          placeholder='password'
          type='password'
          onChange={handleFormChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}