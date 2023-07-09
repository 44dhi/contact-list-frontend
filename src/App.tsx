import React, { Suspense, lazy } from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Box, CircularProgress, CssBaseline, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Login = lazy(() => import('./views/login/Login'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/f',
        element: <div>sdsd</div>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: blue[700],
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        typography: {
          fontFamily: 'Inter'
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '10px'
              }
            }
          }
        }
      }),
    [prefersDarkMode],
  );

  const SuspenseLoader = () => {
    return <Box className="suspense-loader">
      <CircularProgress />
      <Typography color={'primary'} fontWeight={600}>Loading...</Typography>
    </Box>
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Suspense fallback={<SuspenseLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
