/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import instance from '../../utils/api'
import { useAppDispatch } from '../../store/hooks'
import { getUserForRedux } from '../../store/slices/userSlice'

function Layout({children}: any) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accessToken = localStorage.getItem('accessToken')

  async function getUser() {
    try {
      const res = await instance.get('/user/current')
      dispatch(getUserForRedux(res.data))
    } catch (error: any) {
      const {response} = error
      if(response.status === 403) {
        console.log('Invalid Session token')
        //handle this with a modal
      }
    }
  }

  useEffect(() => {
    if(!accessToken) {
      navigate('/login')
      return 
    }
    getUser()
  },[accessToken, navigate,])

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout