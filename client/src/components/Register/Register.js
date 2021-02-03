import React, { useState, useEffect } from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';

// Custom components
import logo from '../../imgs/FAVPNG_tennis-ball-racket-squash_H6gMq096.png';
import ApiService from '../ApiService';

export default function Register(props) {
  const [newPlayer, setNewPlayer] = useState({});
  const [errorText, setErrorText] = useState('');

  const checkPassword = () => {
    if (newPlayer.password !== newPlayer.passwordConfirm) {
      setErrorText('The passwords do not match');
      return false;
    } else {
      setErrorText(null);
      return true;
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPlayer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Submit if 'checkPassword' returns true
    if (checkPassword()) {
      // POST newPlayer API
      const res = await ApiService.addNewPlayer(newPlayer);

      // If no response object returned or response body has an error prop - update error message
      if (!res || res.error) {
        if (res.error) {
          console.log('INFO: register POST returned error =', res.error);
          setErrorText(res.error);
        } else {
          console.log(
            'INFO: register POST returned error; no specified reason'
          );
          setErrorText(
            'An unknown issue occurred. Please try registering again.'
          );
        }
      } else {
        // Update the URL to /home using history
        props.history.push('/home');
        // set Auth state to true.
        props.setIsAuth(true);
        // Update local storage with login details.
        const { token } = res;
        localStorage.setItem('auth', 'true');
        localStorage.setItem('accessToken', token);
        localStorage.setItem('sessionEmail', newPlayer.email);
      }
    }
  }

  return (
    <div className='register'>
      <div className='register__titleContainer'>
        <img className='register__logo' src={logo} />
        <h2 className='register__title'>Club Ladder</h2>
      </div>
      <form className='register__form' onSubmit={handleSubmit}>
        <input
          className='register__formFirstname'
          name='firstName'
          required
          placeholder='First name(s)'
          onChange={handleInputChange}
        />
        <input
          className='register__formLastname'
          name='lastName'
          required
          placeholder='Last name'
          onChange={handleInputChange}
        />
        <input
          className='register__email'
          name='email'
          required
          placeholder='Email address'
          onChange={handleInputChange}
          type='email'
        />
        <input
          className='register__formPassword'
          name='password'
          required
          placeholder='Password'
          type='password'
          onChange={handleInputChange}
        />
        <input
          className='register__formPasswordConfirm'
          name='passwordConfirm'
          required
          placeholder='Reconfirm password'
          type='password'
          onChange={handleInputChange}
        />
        {errorText && <p className='errorText'>{errorText}</p>}

        <button type='submit'>register</button>
        <p className='register__loginText'>
          Already registered? <Link to={'/login'}>Login here</Link>
        </p>
      </form>
    </div>
  );
}
