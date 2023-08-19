/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.scss'
import { Avatar, Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { filterContactsByAlphabet } from '../../utils/Contacts'
import { Contacts } from '../../utils/interfaces'
import { ButtonBase } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'


function Sidebar() {

  const theme = useTheme()
  const userRedux = useAppSelector(state => state.user);
  const { loading, user } = userRedux
  const contacts = user?.contacts
  const navigate = useNavigate()
  const location = useLocation()

  const [categories, setCategories] = useState([])
  const [displayArray, setDisplayArray] = useState(contacts)

  useEffect(() => {
    if(contacts) {
      const firstLetters = filterContactsByAlphabet(contacts)
      setCategories(firstLetters)
      setDisplayArray(contacts)
    }
  }, [contacts])

  return (
    <Box sx={{borderRight: `1px solid ${theme.palette.divider}`}} className={styles['layout']}>
      <Box className={styles['nav']} sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
        {
          loading
            ? <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
              <CircularProgress size={20} />
              <Typography variant='h6'>Loading...</Typography>
            </Stack>
            : <Typography variant='h6'>{contacts?.length} Contacts</Typography>
        }
      </Box>
      {
        loading && 
        <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress />
        </Stack>
      }
      {
        contacts?.length === 0
        ? <div>No contacts</div>
        : categories?.map((key, index) => {
          return <div>
            <Box className={styles['letter-heading']} key={index}>
              <span>{key}</span>
            </Box>
            <div>
              {
                displayArray?.map((contactKey: Contacts, index2 : number, array: any) => {
                  if(contactKey.first_name.charAt(0) === key)
                  return <ButtonBase className={location.pathname === `/${contactKey._id}` ? styles['selected'] : 'none'} sx={{ width: '100%', justifyContent: 'flex-start'}} onClick={()=> { navigate(`/${contactKey._id}`)}}>
                    <Stack direction={'row'} alignItems={'center'} gap={2} className={styles['contact-cell']}>
                      <Avatar sx={{backgroundColor: `${contactKey.color}`}}>{contactKey.first_name.charAt(0)}</Avatar>
                      <span>
                        {contactKey.first_name} {contactKey.last_name}
                      </span>
                    </Stack>
                  </ButtonBase>
                })
              }
            </div>
          </div>
        })
      }
    </Box>
  )
}

export default Sidebar
