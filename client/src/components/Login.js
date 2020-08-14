import React, { useState, useContext } from 'react'
import ApiService from './ApiService';

export default function Login(props) {
  const [ state, setState ] = useState({ email: '', password : ''});
  const [ failedAuth, setFailedAuth ] = useState(null);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setState( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleFormSubmit (e) {
    e.preventDefault();
    // Authentication check
    const { email, password } = state;
    const user = { email, password };
    const isAuthenticated = await ApiService.JWTLogin(state.email, state.password);

    if (!isAuthenticated) {
      setFailedAuth(true);
    } else {
      // Update the URL to /home using history
      props.history.push('/home');
      // set Auth state to true.
      props.setIsAuth(true);
      // Set local storage auth to true
      localStorage.setItem("auth", "true");
    }
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleFormSubmit}>
        <input
          name='email'
          placeholder='email'
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
        { failedAuth && <p>Wrong Username or Password</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}