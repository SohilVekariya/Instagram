import React from 'react'
import './HomeLayout.css'
import { SideNavbar } from '../components/SideNavbar/SideNavbar'
import LoginFooter from '../components/shared/LoginFooter'

const HomeLayout = ({children}) => {
  return (
    <div>
        <div className='flex gap-2'>
            <SideNavbar/>
            <div className="container">
                {children}
            </div>
        </div>
        <div className='absolute bottom-0 text-center w-full'>
            <LoginFooter/>
        </div>
    </div>
  )
}

export default HomeLayout