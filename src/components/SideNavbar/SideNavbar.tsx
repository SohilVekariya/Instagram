import React from 'react'
import instaLogo from "../../assets/images/Instagram_logo.svg"

export const SideNavbar = () => {
  return (
    <div className='sidenav fixed flex flex-col justify-between z-10'>
        <img
        className="sidenav__logo"
        src={instaLogo}
        alt="Instagram Logo"
      />
    </div>
  )
}
