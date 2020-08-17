import React from 'react'
import logo from '../imgs/1200px-ATP_Cup_logo.svg.png'
import logoutImage from '../exit-64.png'
import './Header.scss';

export default function Header(props) {
  const handleLogout = () => {
    // Remove auth from local storage, reset state and change URL.
    localStorage.removeItem('auth');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('sessionEmail');
    props.setIsAuth(false);
    props.history.push('/');
  }

  return (
    <div className="headerContainer">
      <div className="headerLogoContainer">
        <img alt="ATP Cup logo" src={logo} className="headerLogo"></img>
      </div>
      <div className="headerTitle">
        Club Challenge Ladder
      </div>
        <div className="logoutContainer">
          <img alt="logout" src={logoutImage} className="logoutImage" onClick={() => handleLogout()}></img>
        </div>
    </div>
  )
}
