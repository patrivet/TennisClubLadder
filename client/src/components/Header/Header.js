import React from 'react'
import logo from '../../imgs/FAVPNG_tennis-ball-racket-squash_H6gMq096.png'
import logoutImage from '../../imgs/FAVPNG_login-icon-design_9i5xv4Rg.png'
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
      <h1 className="headerTitle">
        CLUB LADDER
      </h1>
        <div className="logoutContainer">
          <img alt="logout" src={logoutImage} className="logoutImage" onClick={() => handleLogout()}></img>
        </div>
    </div>
  )
}
