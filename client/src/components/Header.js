import React from 'react'
import logo from '../imgs/1200px-ATP_Cup_logo.svg.png'
import logoutImage from '../exit-64.png'
import settingsImage from '../imgs/settings-48.png'

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="headerLogoContainer">
        <img alt="ATP Cup logo" src={logo} className="headerLogo"></img>
      </div>
      <div className="headerTitle">
        Santa Monica TC Ladder
      </div>
        <div className="logoutContainer">
          <img alt="logout" src={logoutImage} className="logoutImage"></img>
        </div>
        {/* <div className="settingsContainer">
          <img alt="settings" src={settingsImage} className="settingsImage"></img>
        {/* </div> */}


    </div>
  )
}
