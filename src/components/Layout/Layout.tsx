/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import instance from '../../utils/api'
import { useAppDispatch } from '../../store/hooks'
import { getUserForRedux } from '../../store/slices/userSlice'
import { Stack } from '@mui/material'
import styles from './Layout.module.scss'
import Sidebar from '../Sidebar/Sidebar'

function Layout({children}: any) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

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
    <div className={styles['layout-controller']}>
      <div className={styles['max-width-controller']}>
        <Header />
        {
          location.pathname === '/'
            ?  <Stack width={'100%'} direction={'row'}>
              <div className={styles['sidebar-controller-full']}>
                <Sidebar />
              </div>
              <div className={styles['outlet-controller']}>
                <Outlet />
              </div>
            </Stack>
            :  <Stack width={'100%'} direction={'row'}>
              <div className={styles['sidebar-controller']}>
                <Sidebar />

              </div>
              <Outlet />
            </Stack>
        }
        {/* // <Stack width={'100%'} direction={'row'}>
        //   <Sidebar />
        //   <Outlet />
        // </Stack> */}
      </div>
    </div>
  )
}

export default Layout