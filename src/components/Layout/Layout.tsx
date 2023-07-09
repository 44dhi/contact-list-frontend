import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'

function Layout({children}: any) {

  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if(!accessToken) {
      navigate('/login')
    }
  },[accessToken, navigate])

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout