import React, { useEffect, useState } from 'react'
import styles from './Login.module.scss'
import { Alert, AlertColor, Button, Card, InputAdornment, Snackbar, Stack, Typography, useTheme } from '@mui/material'
import { StyledInput } from '../../components/StyledComponents/StyledComponents'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import LogoFullDark from '../../assets/logo_full_dark.png'
import LogoFullWhite from '../../assets/logo_full_white.png'
import Bg from '../../assets/bg.png'
import { LoadingButton } from '@mui/lab';
import instance from '../../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const theme = useTheme()
  const navigate = useNavigate();

  const { mode } = theme.palette

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [openSnackBar, setSnackBar] = useState(false)
  const [snackText, setSnackText] = useState<string>('')
  const [snackType, setSnackType] = useState<AlertColor>('error')
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token, navigate])


  async function loginForm(e:any) {
    e.preventDefault()

    if(email === '') {
      toggleSnack('Email Field is empty', 'error')
      return
    }
    if(!password) {
      toggleSnack('Password cannot be empty', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await instance.post('/user/login', {
        email: email,
        password: password
      })
      const {accessToken} = res.data
      localStorage.setItem('accessToken', accessToken)
      navigate(0)
    } catch (error: any) {
      console.log(error.code)
      setLoading(false)

      if(error.code === 'ERR_BAD_REQUEST') {
        toggleSnack('Your credentials did not match', 'error')
        setPassword('')
        return
      }

      toggleSnack('Please try again later', 'error')
    }
  }

  function toggleSnack(text: string, type: AlertColor) {
    setSnackBar(true)
    setSnackText(text)
    setSnackType(type)
    setTimeout(() => {
      setSnackText('')
      setSnackBar(false)
    }, 4000)
  } 


  return (
    <Stack direction={'column'} p={2} justifyContent={'center'} alignItems={'center'} height={'100%'} gap="40px">
      <div className={styles['absolute-container']}>
        <img src={Bg} alt='bg' style={{ opacity: mode === 'dark' ? '20%' : '80%'}} />
      </div>
      <img src={mode === 'dark' ? LogoFullDark : LogoFullWhite} className={styles['image-controller']} alt='logo-img' />
      <Card className={styles['login-card']} sx={{ borderRadius: '10px', position: 'relative', zIndex:100}}>
        <Typography variant='h5' fontWeight={600}>Sign in to get started</Typography>
        <Stack gap={'10px'} sx={{ width: '100%'}}>
          <Typography>Email Address</Typography>
            <StyledInput
              placeholder='john@gmail.com'
              type='email'
              name='email'
              autoComplete='on'
              size='small'
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
        </Stack>
        <Stack gap={'10px'} sx={{ width: '100%'}}>
          <Typography>Password</Typography>
          <StyledInput
            type='password'
            placeholder='******'
            size='small'
            required
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='on'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton loading={loading} variant='contained' type='submit' onClick={(e) => {loginForm(e)}} size='large' fullWidth>Login</LoadingButton>
        <Button  size='small'>Forgot Password?</Button>
      </Card>
      <Snackbar
        open={openSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackType}>{snackText}</Alert>
      </Snackbar>
    </Stack>
  )
}

export default Login
