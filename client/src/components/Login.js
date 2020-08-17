import React, { useState, useContext } from 'react'
import ApiService from './ApiService';

export default function Login(props) {
  const [ state, setState ] = useState({ email: '', password : ''});
  const [ failedAuth, setFailedAuth ] = useState(null);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setState( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleFormSubmit (event) {
    e.preventDefault();
    // Authentication check
    const { email, password } = state;
    const res = await ApiService.JWTLogin(state.email, state.password);

    if (!res) {
      setFailedAuth(true);
    } else {
      // Update the URL to /home using history
      props.history.push('/home');
      // set Auth state to true.
      props.setIsAuth(true);

      // Local storage
      // auth flag
      localStorage.setItem("auth", "true");
      // JWT token
      const { token } = res;
      localStorage.setItem("accessToken", token);
      // Logged in user email
      localStorage.setItem('sessionEmail', email);
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