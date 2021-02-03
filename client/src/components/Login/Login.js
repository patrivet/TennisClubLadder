import React, { useState } from 'react';
import ApiService from '../ApiService';
import './Login.scss';
import { Link } from 'react-router-dom';
import logo from '../../imgs/FAVPNG_tennis-ball-racket-squash_H6gMq096.png';

export default function Login(props) {
  const [state, setState] = useState({ email: '', password: '' });
  const [failedAuth, setFailedAuth] = useState(null);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // Authentication check
    const { email, password } = state;
    const res = await ApiService.JWTLogin(email, password);

    if (!res) {
      setFailedAuth(true);
    } else {
      // Update the URL to /home using history
      props.history.push('/home');
      // set Auth state to true.
      props.setIsAuth(true);

      // Local storage
      // auth flag
      localStorage.setItem('auth', 'true');
      // JWT token
      const { token } = res;
      localStorage.setItem('accessToken', token);
      // Logged in user email
      localStorage.setItem('sessionEmail', email);
    }
  }

  return (
    <div className='login'>
      <div className='login__titleContainer'>
        <img className='login__logo' src={logo} />
        <h2 className='login__title'>Club Ladder</h2>
      </div>
      <form className='login__form' onSubmit={handleFormSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Enter your email address'
          onChange={handleFormChange}
          required
        />
        <input
          name='password'
          placeholder='Enter your password'
          type='password'
          onChange={handleFormChange}
          required
        />
        {failedAuth && (
          <p className='login__failed'>Wrong Username or Password</p>
        )}
        <button type='submit'>LOG IN</button>
        <p className='login__registerText'>
          Not registered? <Link to={'/register'}>Register here</Link>
        </p>
      </form>
    </div>
  );
}
