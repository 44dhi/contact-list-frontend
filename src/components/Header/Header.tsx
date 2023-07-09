import { Avatar, Box, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Stack, useTheme } from '@mui/material'
import React from 'react'
import styles from './Header.module.scss'
import Logo from '../../assets/logo.png'
import { StyledInput } from '../StyledComponents/StyledComponents'
import { Settings } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

function Header() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function logout() {
    localStorage.removeItem('accessToken') // remove token on log out
    navigate(0)
  }

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
      <Stack direction={'row'} gap="20px" alignItems={'center'}>
        <IconButton sx={{height: '40px'}}>
          <Settings />
        </IconButton>
        <IconButton ria-describedby={id} onClick={handleClick}>
          <Avatar sx={{backgroundColor: '#6d45fc'}}>SA</Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: {
            width: '240px'
          }}}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItem onClick={() => {logout()}}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  )
}

export default Header