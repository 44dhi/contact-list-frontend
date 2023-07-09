import { Avatar, Box, IconButton, Stack, useTheme } from '@mui/material'
import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../assets/logo.png'
import { StyledInput } from '../StyledComponents/StyledComponents'
import { Settings } from '@mui/icons-material'

function Header() {
  const theme = useTheme()
  console.log(theme.palette.divider)
  return (
    <Box className={styles['layout']} sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
      <Stack direction={'row'} gap={'20px'} alignItems={'center'} className={styles['container']}>
        <img src={Logo} draggable={false} alt='logo' />
        <StyledInput
          size='small'
          placeholder='Search Contacts'
          sx={{
            backgroundColor: theme.palette.action.selected,
          }}
        />
      </Stack>
      <Stack direction={'row'} gap="20px">
        <IconButton>
          <Settings />
        </IconButton>
        <Avatar sx={{backgroundColor: '#6d45fc'}}>SA</Avatar>
      </Stack>
    </Box>
  )
}

export default Header