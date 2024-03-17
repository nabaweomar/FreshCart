import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/userToken'

export default function Layout() {
  let { setToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setToken(localStorage.getItem('userToken'))
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className="layout container mt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
