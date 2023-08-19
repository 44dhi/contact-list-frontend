import React from 'react'
import styles from './ContactMain.module.scss'
import { Box, Button, CircularProgress, IconButton, Stack } from '@mui/material'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getContactForId } from '../../utils/api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

function ContactMain() {

  const params = useLocation()
  const navigate = useNavigate()
  const {pathname} = params  

  const contactQuery = useQuery({
    queryKey: [pathname],
    enabled: pathname ? true : false,
    queryFn: (obj) => getContactForId(pathname).then(res => {
      return res.data
    })
  })

  if(contactQuery.isLoading) {
    return <Stack alignItems={'center'} justifyContent={'center'} className={styles['layout-loading']}>
      <CircularProgress />
    </Stack>
  }

  if(contactQuery.error || contactQuery.data.error) {
    return <Stack alignItems={'center'} justifyContent={'center'} className={styles['layout']}>
      <span>This Contact doesn't exist or was deleted</span>
    </Stack>
  }

  return (
    <div className={styles['layout']}>
      {/* nav */}
      <div className={styles['nav']}>
        <IconButton className={styles['responsive-button']} onClick={() => navigate('/')}>
          <ArrowBackIcon fontSize='medium' />
        </IconButton>
        <IconButton>
          <MoreHorizIcon fontSize='medium' />
        </IconButton>
      </div>

      {/* avatar */}
      <Stack width={'100%'} direction={'column'} alignItems={'center'}>
        <Box sx={{ backgroundColor: contactQuery.data.color}} className={styles['avatar-controller']}>
          <span className={styles['first']}>{contactQuery.data.first_name.charAt(0)}</span>
        </Box>
      </Stack>
      <Box className={styles['content-control']}>
        <span className={styles['name']}>{contactQuery.data.first_name} {contactQuery.data.last_name}</span>
        <div className={styles['tag']}>
          {contactQuery.data.category}
        </div>
      </Box>
      <Box className={styles['contact-info']}>
        <span>PHONE</span>
        {
          contactQuery.data?.phone_number.map((key:any, index: any) => {
            return <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={styles['phone-cell']}>
              <div className={styles['touch-controller']} onClick={() => {window.open(`tel:${key}`)}} />
              <label>{key}</label>
              <LocalPhoneIcon />
            </Stack>
          })
        }
      </Box>
      <Box className={styles['contact-info']}>
        <span>EMAIL ADDRESS</span>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className={styles['phone-cell']}>
          <div className={styles['touch-controller']} onClick={() => {window.open(`mailto:${contactQuery.data.email_address}`)}} />
          <label>{contactQuery.data.email_address}</label>
          <EmailIcon />
        </Stack>
      </Box>
    </div>
  )
}

export default ContactMain